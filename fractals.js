class SquareFractal{
    draw_square(x, y, size){
        rect(x, y, size, size);
        let new_size = size / 3;
        if(new_size <= 1)
            return;
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if(i !== 1 || j !== 1)
                    this.draw_square(x + i * new_size, y + j * new_size, new_size);
    }

    draw(){
        let size = min(windowHeight, windowWidth);
        this.draw_square(-size / 2, -size / 2, size);
    }
}

let fractals = [
    SquareFractal,
];
