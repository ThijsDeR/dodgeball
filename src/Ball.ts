export default class Ball{
    private color: string;

    private size: number;

    private pos: {x: number, y: number};

    private velocity: {x: number, y: number};

    private ctx: CanvasRenderingContext2D;

    constructor(color: string, size: number, pos: {x: number, y: number}, velocity: {x: number, y: number}, ctx: CanvasRenderingContext2D){
        this.color = color;
        this.size = size;
        this.pos = pos
        this.velocity = velocity
        this.ctx = ctx
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(this.pos.x, this.pos.y, this.size, this.size, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    update() {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }

    updateVelocity(velocity: {x: number, y: number}) {
        this.velocity = velocity;
    }

    getPosition() {
        return this.pos
    }

    getVelocity() {
        return this.velocity
    }
}