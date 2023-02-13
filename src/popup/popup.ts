import { fetchKrunkerGames } from "./krunker-service";
import "./popup.scss";
// Import all of Bootstrap's JS... TODO: IT doesn't work...
//import * as Bootstrap from 'bootstrap'

//GLOBAL VARIABLES
let mapSelection: string;
let location: string = "de-fra";
let totPlayers: number;
const freePlayers: HTMLElement | null = document.getElementById("counter");
const minInGamePlayers = 2;
let custom: boolean = false;
let url = "https://krunker.io/?game=";
const resultElement: HTMLElement | null = document.getElementById('result');
let gamesArray = []


function createAnchor(title: string, url: string) { // Create anchor element.

    // Create the text node for anchor element.
    const linkAnchor: HTMLAnchorElement = document.createElement('a');
    // Append the text node to anchor element.
    const linkTitle: Text = document.createTextNode(title);

    // Set the title.
    linkAnchor.appendChild(linkTitle);

    // Set the properties.
    linkAnchor.title = title;
    linkAnchor.href = url;

    return linkAnchor;
}

//CORE FUNCTION: calls the API, filters data and produces output links
function handleClickGetLinks(ev: MouseEvent) {

    if (resultElement === null || freePlayers === null) {
        console.error("The element that should contain the result is null.");
        return;
    }

    fetchKrunkerGames()
        .then(response => response.json())
        .then(data => {

            resultElement.innerHTML = "";
            gamesArray = data.games.filter((game: any) => {
                return (game[1] == location && (game[3] - game[2]) >= parseInt(freePlayers.innerHTML) && game[2] >= minInGamePlayers && game[4].c == custom)
            })

            gamesArray.sort();

            for (var i = 0; i < gamesArray.length; i++) {
                const game = gamesArray[i]
                const parameters = game[4]
                const map = parameters.i
                let link = url + game[0];
                let anchor = '<a target="_blank" href="' + link + '">' + map + '</a>'
				resultElement.innerHTML += '<li>' + anchor + ' - totPosti: ' + game[3] + ' - liberi: '+ (game[3]-game[2]) + '</li>';
            }

            const content: HTMLElement | null = document.getElementById('vanish');
            if (content !== null){
                if(gamesArray.length!=0)
                    content.style.display= 'flex';
                else
                    content.style.display= 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

//Manages the counter
function handleCounter(ev:MouseEvent, flag:boolean){
    if (freePlayers === null) {
        console.error("The element that should contain the counter is null.");
        return;
    }
    //If flag==true + button has been clicked
    if (flag)
        freePlayers.innerHTML = (parseInt(freePlayers.innerHTML) + 1).toString();
    else if (parseInt(freePlayers.innerHTML) != 0)
        freePlayers.innerHTML = (parseInt(freePlayers.innerHTML) - 1).toString();
}

//Launch button trigger
const requestLinkButton: HTMLElement | null = document.getElementById('request-links');
const audio = new Audio("/sounds/hover_0.mp3");
// If the button is found, bind the onclick event with the function handleClickGetLinks
if (requestLinkButton !== null && audio !== null){
    requestLinkButton.onclick = handleClickGetLinks;
    
    //Start the sound during button handover
    requestLinkButton.addEventListener('mouseover', function() {
        audio.currentTime = 0; // Reset the sound to the start
        audio.play();
    });
}

//Increase Counter
const requestIncrementCounter: HTMLElement | null = document.getElementById('request-increment-counter');
if (requestIncrementCounter !== null){
    requestIncrementCounter.addEventListener('click', (event) => handleCounter(event, true))}
    
//Decrease Counter
const requestDecrementCounter: HTMLElement | null = document.getElementById('request-decrement-counter');
if (requestDecrementCounter !== null){
    //requestDecrementCounter.onclick = handleCounter;
    requestDecrementCounter.addEventListener('click', (event) => handleCounter(event, false));
}