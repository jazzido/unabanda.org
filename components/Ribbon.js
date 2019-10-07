import { theme } from "../lib/theme";
const Ribbon = ({ position, className, content }) => {
  return (
    <div className={`ribbon ribbon-${position} ${className}`}>
      <span>{content}</span>
      <style jsx>
        {`
          .has-ribbon.ribbon-hidden .ribbon {
            display: none;
          }
          .ribbon.hoy span {
            background-color: ${theme.colorHoy};
          }
          .ribbon.hoy span::before {
            content: "HOY";
          }
          .ribbon.maniana span {
            background-color: ${theme.colorManiana};
          }
          .ribbon.maniana span::before {
            content: "MAÑANA";
          }
          .ribbon.despues span {
            background-color: ${theme.colorDespues};
          }
          /* common */
          .ribbon {
            width: 80px;
            height: 80px;
            overflow: hidden;
            position: absolute;
            pointer-events: none;
          }
          .ribbon::before,
          .ribbon::after {
            position: absolute;
            z-index: -1;
            content: "";
            display: block;
          }
          .ribbon span {
            position: absolute;
            display: block;
            width: 120px;
            padding: 8px 0;
            padding-top: 10px;
            color: #fff;
            font: 700 11px/1 sans-serif;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
            text-align: center;
          }
          /* top right*/
          .ribbon-top-right {
            top: 0px;
            right: 0px;
          }
          .ribbon-top-right::before,
          .ribbon-top-right::after {
            border-top-color: transparent;
            border-right-color: transparent;
          }
          .ribbon-top-right::before {
            top: 0;
            left: 0;
          }
          .ribbon-top-right::after {
            bottom: 0;
            right: 0;
          }
          .ribbon-top-right span {
            left: -4px;
            top: 7px;
            transform: rotate(45deg);
          }
          /* top left*/
          .ribbon-top-left {
            top: -10px;
            left: -10px;
          }
          .ribbon-top-left::before,
          .ribbon-top-left::after {
            border-top-color: transparent;
            border-left-color: transparent;
          }
          .ribbon-top-left::before {
            top: 0;
            right: 0;
          }
          .ribbon-top-left::after {
            bottom: 0;
            left: 0;
          }
          .ribbon-top-left span {
            right: -12.8px;
            top: 16px;
            transform: rotate(-45deg);
          }
          /* bottom left*/
          .ribbon-bottom-left {
            bottom: -10px;
            left: -10px;
          }
          .ribbon-bottom-left::before,
          .ribbon-bottom-left::after {
            border-bottom-color: transparent;
            border-left-color: transparent;
          }
          .ribbon-bottom-left::before {
            bottom: 0;
            right: 0;
          }
          .ribbon-bottom-left::after {
            top: 0;
            left: 0;
          }
          .ribbon-bottom-left span {
            right: -25px;
            bottom: 30px;
            transform: rotate(225deg);
          }
          /* bottom right*/
          .ribbon-bottom-right {
            bottom: -10px;
            right: -10px;
          }
          .ribbon-bottom-right::before,
          .ribbon-bottom-right::after {
            border-bottom-color: transparent;
            border-right-color: transparent;
          }
          .ribbon-bottom-right::before {
            bottom: 0;
            left: 0;
          }
          .ribbon-bottom-right::after {
            top: 0;
            right: 0;
          }
          .ribbon-bottom-right span {
            left: -25px;
            bottom: 30px;
            transform: rotate(-225deg);
          }
        `}
      </style>
    </div>
  );
};

export default Ribbon;
