import "./styles.css";
import korea from "./korea.json";
import world from "./world.json";
import { colors } from "./colors";
import { setSize } from "./utils";
import { feature } from "topojson-client";
import { geoPath, geoMercator, geoContains } from "d3-geo";

const elem = document.getElementById("app");
// const { top, left } = elem.getBoundingClientRect();
const top = 8;
const left = 8;
const canvasWidth = 800;
const canvasHeight = 1000;

const projection = getProjectionAppliedScale();
const gp = geoPath(projection);
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function render(width, height) {
  setSize(canvas, ctx, width, height);

  const mapData = getGeoJSONData();

  mapData.forEach((object, idx) => {
    const { areaCanvas, bounds } = getNewMapAreaCanvas(object, idx);
    ctx.drawImage(areaCanvas, bounds.x, bounds.y, bounds.width, bounds.height);
  });

  addClickEvent(canvas);
  elem.append(canvas);
}

function getNewMapAreaCanvas(object, idx) {
  const areaCanvas = document.createElement("canvas");
  const areaCtx = areaCanvas.getContext("2d");
  const bb = gp.bounds(object);
  const bounds = {
    x: bb[0][0],
    x2: bb[1][0],
    y: bb[0][1],
    y2: bb[1][1],
    width: bb[1][0] - bb[0][0],
    height: bb[1][1] - bb[0][1]
  };
  setSize(areaCanvas, areaCtx, bounds.width, bounds.height);

  areaCtx.beginPath();
  areaCtx.translate(-bounds.x, -bounds.y);
  gp.context(areaCtx)(object);
  areaCtx.fillStyle = colors[idx % colors.length];
  areaCtx.fill();

  return { areaCanvas, bounds };
}

function getGeoJSONData() {
  return feature(korea, korea.objects["skorea-provinces-geo"]).features; // 한국
}

function getKoreaOutlineJSONData() {
  return feature(world, world.objects.countries).features.find(
    (a) => a.properties.name === "South Korea"
  );
}

function addClickEvent(canvas) {
  canvas.addEventListener("click", (ev) => {
    showCountryNameInRange(ev.offsetX, ev.offsetY);
  });
}

function showCountryNameInRange(mouseX, mouseY) {
  const countries = getGeoJSONData();
  const MapCoord = projection.invert([mouseX, mouseY]);
  const country = countries.find((country) => {
    return MapCoord !== null && geoContains(country, MapCoord); // 좌표가 지도에 포함되었는지 확인
  });

  if (country) {
    console.log(country.properties);
  }
}

function getProjectionAppliedScale() {
  const projection = geoMercator();
  const area = {
    bottom: canvasHeight + top,
    height: canvasHeight,
    left,
    right: canvasWidth + left,
    top,
    width: canvasWidth
  };

  const { width, height, refScale, refX, refY } = computeBounds(projection);

  const chartWidth = area.right - area.left;
  const chartHeight = area.bottom - area.top;

  const scale = Math.min(chartWidth / width, chartHeight / height);
  const viewWidth = width * scale;
  const viewHeight = height * scale;

  const x = (chartWidth - viewWidth) * 0.5 + area.left;
  const y = (chartHeight - viewHeight) * 0.5 + area.top;

  projection
    .scale(refScale * scale)
    .translate([scale * refX + x, scale * refY + y]);

  return projection;
}

function computeBounds(projection) {
  const outline = getKoreaOutlineJSONData();
  const bounds = geoPath(projection.fitWidth(canvasWidth, outline)).bounds(
    outline
  );
  const height = Math.ceil(bounds[1][1] - bounds[0][1]);
  const width = Math.ceil(bounds[1][0] - bounds[0][0]);
  const t = projection.translate();

  return {
    width,
    height,
    aspectRatio: width / height,
    refScale: projection.scale(),
    refX: t[0],
    refY: t[1]
  };
}

render(canvasWidth, canvasHeight);
