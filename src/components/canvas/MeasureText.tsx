import {onMount} from "solid-js";

interface Props {
}

const MeasureText = ({}: Props) => {
  let canvasEl;
  const updateCanvas = (e) => {
    const tempEl = document.createElement('canvas');
    tempEl.width = 500;
    tempEl.height = 300;
    const ctx = tempEl.getContext('2d');
    const text = e.target.value;
    const lines = text.split('\n');
    const margin = 30;
    const widthMinusMargin = 500 - margin;
    const heightMinusMargin = 300 - margin;
    const lineHeight = 1;
    const weight = 400;
    const font = 'Arial';

    let size = Math.floor(heightMinusMargin / (1 + ((lines.length - 1) * lineHeight)));

    const measureText = () => {
      let maxWidth = 0;
      let actualHeight = 0;
      let upperSpace = 0;
      let lowerSpace = 0;
      for (let i = 0; i < lines.length; i++) {
        const {
          width: textWidth,
          actualBoundingBoxAscent,
          actualBoundingBoxDescent,
        } = ctx.measureText(lines[i]);
        if (textWidth > widthMinusMargin) {
          return false;
        }
        if (i === 0) {
          upperSpace = actualBoundingBoxAscent;
        } else if (i === lines.length - 1) {
          lowerSpace = actualBoundingBoxDescent;
        }
        maxWidth = Math.max(maxWidth, textWidth);
        actualHeight = actualHeight + actualBoundingBoxAscent + actualBoundingBoxDescent;
      }
      return {actualHeight, maxWidth, upperSpace, lowerSpace};
    };

    let bboxes;
    for (; size > 0; size -= 2) {
      ctx.font = `${weight} ${size}px "${font}"`;
      bboxes = measureText();
      if (bboxes) {
        console.log(bboxes);
        break;
      }
    }

    const usedSpace = size * (lines.length - 1) * lineHeight + size;
    const start = (300 - usedSpace) / 2 + bboxes.upperSpace;
    const startX = (500 - bboxes.maxWidth) / 2;

    const ctx2 = canvasEl.getContext('2d');
    ctx2.clearRect(0, 0, 500, 300);
    ctx2.font = `${weight} ${size}px "${font}"`;
    ctx2.textBaseline = 'top';
    ctx2.fillStyle = '#000';
    ctx2.textAlign = 'left';
    lines.forEach((line, i) => {
      ctx2.fillText(line, startX, start + i * (size + size * lineHeight));
    });
  };

  onMount(() => {
    updateCanvas({target: {value: 'Hello World'}});
  });

  return (
    <div>
      <canvas ref={canvasEl} width="500" height="300"></canvas>
      <textarea onChange={updateCanvas} style={{width: '100%'}}>Hello
        World</textarea>
    </div>
  );
};

export default MeasureText;
