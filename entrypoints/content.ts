export default defineContentScript({
  matches: ['*://*.linkedin.com/mynetwork/*',"*://*.linkedin.com/mynetwork/grow"],
  main() {
    console.log('Hello content.');

    (function () {
      // Added the floating "Connect with All" button
      function addConnectAllButton(): void {
        const button: HTMLButtonElement = document.createElement("button");
        button.textContent = "Connect with All";
        button.classList.add("connect-all-button");
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.padding = "10px 20px";
        button.style.backgroundColor = "#0073b1";
        button.style.color = "white";
        button.style.borderRadius = "5px";
        button.style.border = "none";
        button.style.zIndex = "1000";
        button.onclick = connectWithAll;
        document.body.appendChild(button);
      }
    
      // Find "Connect" buttons by checking the inner span text
      function getConnectButtons(): HTMLButtonElement[] {
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
        const connectButtons: HTMLButtonElement[] = Array.from(buttons).filter((btn: HTMLButtonElement) => {
          const spans: NodeListOf<HTMLElement> = btn.querySelectorAll('span');
          return spans.length > 0 && spans[spans.length - 1].textContent?.trim().toLowerCase() === 'connect';
        });
        return connectButtons;
      }
    
      // Simulate clicking all "Follow" buttons
      function connectWithAll(): void {
        const connectButtons: HTMLButtonElement[] = getConnectButtons();
    
        if (connectButtons.length === 0) {
          alert("No Connectable Profiles Available.");
          return;
        }
    
        let delay = 1000; // initial delay (1 second)
        connectButtons.forEach((btn: HTMLButtonElement, index: number) => {
          setTimeout(() => {
            btn.click();  // Simulate click on the "Connect" button
            console.log(`Clicked Connect button ${index + 1}`);
          }, delay);
          delay += 3000;  //assigning delay of 3 second everytime setTimeout Executes
        });
      }
    
      // Initialize the extension
      function init(): void {
        addConnectAllButton();  // Add the "Connect with All" button
      }
    
      // Run the script when the page is loaded
      window.addEventListener("load", init);
    })();


    
    
  },
});
