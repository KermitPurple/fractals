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

class SierpinskiTriangle{
    distance(a, b){
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    get_midpoint(a, b){
        return createVector((a.x + b.x) / 2, (a.y + b.y) / 2);
    }

    draw_triangle(points){
        triangle(
            points[0].x,
            points[0].y,
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
        );
        let d = this.distance(points[0], points[1]);
        if(d <= 5)
            return;
        this.draw_triangle([
            points[0],
            this.get_midpoint(points[0], points[1]),
            this.get_midpoint(points[0], points[2]),
        ])
        this.draw_triangle([
            points[1],
            this.get_midpoint(points[1], points[0]),
            this.get_midpoint(points[1], points[2]),
        ])
        this.draw_triangle([
            points[2],
            this.get_midpoint(points[2], points[1]),
            this.get_midpoint(points[2], points[0]),
        ])
    }

    draw(){
        this.draw_triangle([
            createVector(0, -windowHeight / 2),
            createVector(windowWidth / 2, windowHeight / 2),
            createVector(-windowWidth / 2, windowHeight / 2),
        ]);
    }
}

let fractals = [
    SquareFractal,
    SierpinskiTriangle,
];
