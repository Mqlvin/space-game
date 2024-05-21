let rxGraph = document.getElementById("rx-graph");
let txGraph = document.getElementById("tx-graph");

let rxContext = rxGraph.getContext("2d");
let txContext = txGraph.getContext("2d");



export class GraphManager {
    constructor() {
        this.rxPoints = new Array(11).fill(0);
        this.txPoints = new Array(11).fill(0);
    }

    pushValues(rx, tx) {
        this.rxPoints.push(rx);
        this.txPoints.push(tx);

        while(this.rxPoints.length > 11) {
            this.rxPoints.shift();
        }

        while(this.txPoints.length > 11) {
            this.txPoints.shift();
        }
    }

    renderGraphs() {
        this.#renderGraph(rxGraph, rxContext, this.rxPoints, "rgb(189, 252, 255)");
        this.#renderGraph(txGraph, txContext, this.txPoints, "rgb(234, 189, 255)");
    }

    #renderGraph(canvas, context, values, colour) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = colour;
        context.lineWidth = 0.8;

        context.beginPath();
        context.moveTo(0, canvas.height - values[0] / 7 - 1);
        for(let i = 1; i < values.length; i++) {
            context.lineTo(i * 12, (canvas.height - values[i] / 7) - 1);
        }
        context.stroke();


        context.strokeStyle = "#CCCCCC";

        context.beginPath();
        context.moveTo(0, canvas.height - (values[0] / 7) - 1);
        context.lineTo(0, canvas.height);
        context.stroke();

        context.beginPath();
        context.moveTo(canvas.width, canvas.height - (values[values.length - 1] / 7) - 1);
        context.lineTo(canvas.width, canvas.height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, canvas.height);
        context.lineTo(canvas.width, canvas.height);
        context.stroke();
    }

    static instance() {
        return classInstance;
    }
}

const classInstance = new GraphManager();