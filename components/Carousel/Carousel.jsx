import Slider from "react-slick";

import { useTheme, useMediaQuery } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"

const genericSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "50px"
}

function getSettings({ nItems, extraSettings }) {
    let newSettings = { ...genericSettings, ...extraSettings }
    if (nItems < 2) {
        newSettings.infinite = false
    }
    return newSettings
}

export default function Carousel({ children, nItems, settings }) {
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const totalSettings = getSettings({ nItems, extraSettings: settings })

  return (
    <Slider
        {...totalSettings}
    >
        {
            children
        }
    </Slider>
  );
}