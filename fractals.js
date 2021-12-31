function distance(a, b){
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

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
        let d = distance(points[0], points[1]);
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

class FractalTree{
    draw_tree(pos, len, theta = HALF_PI){
        if(len <= 1)
            return
        let new_pos = createVector(
            pos.x - len * Math.cos(theta),
            pos.y - len * Math.sin(theta)
        );
        line(
            pos.x,
            pos.y,
            new_pos.x,
            new_pos.y
        );
        this.draw_tree(new_pos, len / 2, HALF_PI + QUARTER_PI);
        this.draw_tree(new_pos, len / 2, HALF_PI - QUARTER_PI);
    }

    draw(){
        this.draw_tree(
            createVector(0, windowHeight / 2),
            windowHeight / 1.9
        );
    }
}

class HilbertCurve{
    SCALING_FACTOR = 2.2;

    rotate_around(pos, origin, theta){
        let diff = pos.copy().sub(origin);
        return createVector(
            diff.x * Math.cos(theta) - diff.y * Math.sin(theta),
            diff.y * Math.cos(theta) + diff.x * Math.sin(theta)
        ).add(origin);
    }

    draw_curve(points){
        let dist = distance(points[0], points[1]);
        let new_dist = dist / this.SCALING_FACTOR
        if(dist <= 5){
            beginShape();
            for(point of points)
                vertex(point.x, point.y);
            endShape();
            return
        }
        let scaled = points.map(val => createVector(
            val.x / this.SCALING_FACTOR,
            val.y / this.SCALING_FACTOR
        ));
        let size = distance(scaled[0], scaled[scaled.length - 1]);
        let pad = size + new_dist
        let translate = (new_dist / 2 - (pad + new_dist) / 2);
        this.draw_curve([
            ...scaled.map(x => this.rotate_around(x, createVector(0, 0), -HALF_PI)
                .add(createVector(0, -pad))
            ),
            ...[...scaled].reverse(),
            ...[...scaled].reverse().map(x => x.copy().add(createVector(pad, 0))),
            ...[...scaled].map(x => this.rotate_around(x.copy(), createVector(0, 0), HALF_PI)
                .add(createVector(pad, -pad)))
        ].map(x => x.copy().add(createVector(translate, -translate)))
            .reverse()
        );
    }

    draw(){
        let half = min(windowWidth, windowHeight) / 2;
        this.draw_curve([
            createVector(half, -half),
            createVector(half, half),
            createVector(-half, half),
            createVector(-half, -half),
        ]);
    }
}

let fractals = [
    // SquareFractal,
    // SierpinskiTriangle,
    // FractalTree,
    HilbertCurve,
];
