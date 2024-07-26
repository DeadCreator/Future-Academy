function getVals(){
    // Get slider values
    const parent = this.parentNode;
    const slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }

    // const displayElement = document.querySelector(".rangeValues");
    // displayElement.innerHTML = slide1 + " - " + slide2;
}

window.onload = function() {
    // Initialize Sliders
    const sliderSections = document.querySelector(".duration-range").children;
    for (let x = 0; x < sliderSections.length; x++) {
        const slider = sliderSections[x]
        if (slider.type === "range") {
            slider.oninput = getVals;
            // Manually trigger event first time to display values
            slider.oninput();
        }
    }
}