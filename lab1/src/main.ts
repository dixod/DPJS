import path from "node:path";
import { FileReader } from "./services/FileReader.js";
import { Calculations } from "./services/calculations.js";
import logger from "./logger/logger.js";
import { Oval } from "./entities/oval.js";
import { Sphere } from "./entities/sphere.js";

try {
    const shapes = FileReader.read(
        path.resolve(process.cwd(), "data/input.txt")
    );
    logger.info({ count: shapes.length }, "Shapes loaded successfully");

    for (const shape of shapes) {
        if (shape instanceof Oval) {
            const area = Calculations.ovalArea(shape);
            const perimeter = Calculations.ovalPerimeter(shape);
            const isOval = Calculations.isOval(shape);
            const isCircle = Calculations.isCircle(shape);
            const intersectsOneAxis = Calculations.ovalIntersectsExactlyOneAxis(shape, 0);

            logger.info({
                id: shape.id,
                type: "oval",
                area: area.toFixed(2),
                perimeter: perimeter.toFixed(2),
                isOval: isOval,
                isCircle: isCircle,
                intersectsExactlyOneAxis: intersectsOneAxis
            }, "Oval calculations");
        } else if (shape instanceof Sphere) {
            const surface = Calculations.sphereSurface(shape);
            const volume = Calculations.sphereVolume(shape);
            const isSphere = Calculations.isSphere(shape);
            const touchesPlane = Calculations.sphereTouchesAnyCoordinatePlane(shape);
            const ratioXY = Calculations.sphereVolumeRatio(shape, "XY");
            const ratioXZ = Calculations.sphereVolumeRatio(shape, "XZ");
            const ratioYZ = Calculations.sphereVolumeRatio(shape, "YZ");

            logger.info({
                id: shape.id,
                type: "sphere",
                surface: surface.toFixed(2),
                volume: volume.toFixed(2),
                isSphere: isSphere,
                touchesAnyPlane: touchesPlane,
                volumeRatioXY: ratioXY.toFixed(4),
                volumeRatioXZ: ratioXZ.toFixed(4),
                volumeRatioYZ: ratioYZ.toFixed(4)
            }, "Sphere calculations");
        }
    }
} catch (error) {
    logger.error({ err: error }, "Failed to process shapes");
}
