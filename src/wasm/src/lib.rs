use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn rotate_90(width: usize, height: usize, data: &[u8]) -> Vec<u8> {
    let new_width = height;
    let new_height = width;

    let mut rotated = vec![0u8; new_width * new_height * 4];

    for y in 0..height {
        for x in 0..width {
            let old_index = (y * width + x) * 4;

            let r = data[old_index];
            let g = data[old_index + 1];
            let b = data[old_index + 2];
            let a = data[old_index + 3];

            let new_x = y;
            let new_y = new_height - x - 1;

            let new_index = (new_y * new_width + new_x) * 4;

            rotated[new_index] = r;
            rotated[new_index + 1] = g;
            rotated[new_index + 2] = b;
            rotated[new_index + 3] = a;
        }
    }

    rotated
}
