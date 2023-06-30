const btn = document.querySelector(".changeButtonColor");
const colorGrid = document.querySelector(".colorGrid");
const colorHexValue = document.querySelector(".colorHexValue");
const body = document.querySelector("body");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });


  // console.log(tab);

  chrome.scripting.executeScript({
      target:{ tabId : tab.id},function:pickColor,
  },async(colorResults)=>{
    // console.log(colorResults);
    const [ data ] = colorResults;
    if(data.result){
        const yourColor = data.result.sRGBHex;
        colorGrid.style.backgroundColor = yourColor;
        colorGrid.style.margin = "10px 0 0 0"
        colorGrid.style.width = "108px";
        colorGrid.style.height = "75px";
        body.style.width = "400px";

        colorHexValue.innerText = `HEX: ${yourColor}`;
        colorHexValue.style.margin = "10px 0 0 0";

        // Functionality to copy selectedColor automatically to Computer ClipBoard using Navigate 
        try {
            await navigator.clipboard.writeText(color);
        } catch (error) {
            console.error(error);
        }
    }

  })

});


async function pickColor(){
    // console.log("script working on a tab");

    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        // console.log(choosenColor);
    } catch (err) {
        console.error(err);
    }
}