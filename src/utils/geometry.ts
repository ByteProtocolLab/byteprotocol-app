export default class Geometry {
  static getPoint(
    angle: number,
    edge: number,
    centerX: number,
    centerY: number
  ): number[] {
    const x: number = Math.sin(angle) * edge + centerX;
    const y: number = Math.cos(angle) * edge + centerY;
    return [x, y];
  }

  static computeHexagonPoints(
    width: number,
    height: number,
    edge: number
  ): number[][] {
    const points = [];
    const centerX = width / 2;
    const centerY = height / 2;
    // Add center point
    points.push([centerX, centerY]);
    // Six deformation angle
    const triAngle = 60;
    // Number of divisions
    const count = 360 / triAngle;
    // Encapsulation point collection
    for (let i = 0; i < count; i += 1) {
      for (let j = 2; j > 0; j -= 1) {
        const newEdge = (edge / 3) * j;
        const angle = i * triAngle * (Math.PI / 180);
        const point = this.getPoint(angle, newEdge, centerX, centerY);
        points.push(point);
      }
    }
    // Symmetry point
    const originAngle = 30;
    // Plumb line
    const verticalLineEdge = Math.sin(60 * (Math.PI / 180)) * edge;
    for (let i = 0; i < count; i += 1) {
      const angle = (originAngle + i * triAngle) * (Math.PI / 180);
      const point = this.getPoint(
        angle,
        (verticalLineEdge * 2) / 3,
        centerX,
        centerY
      );
      points.push(point);
    }
    return points;
  }
}
