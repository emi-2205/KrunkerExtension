import { fetchKrunkerGames } from "./krunker-service";
import "./popup.scss";

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

function handleClickGetLinks(ev: MouseEvent) {
    const resultElement: HTMLElement | null = document.getElementById('result');

    if (resultElement === null) {
        console.error("The element that should contain the result is null.");
        return;
    }

    fetchKrunkerGames()
        .then(response => response.json())
        .then(data => {

            resultElement.innerHTML = "";
            let gamesArray = []
            let url = "https://krunker.io/?game="

            gamesArray = data.games.filter((game: any) => {
                return (game[1] == "de-fra" && (game[3] - game[2]) > 5 && game[2] > 0 && game[4].c == 0)
            })

            gamesArray.sort();

            for (var i = 0; i < gamesArray.length; i++) {
                const game = gamesArray[i]
                const parameters = game[4]
                const mappa = parameters.i
                let title = "Mappa: " + mappa
                let link = url + game[0];
                let anchor = '<a href="' + link + '">' + mappa + '</a>'
                
				resultElement.innerHTML += '<li>' + anchor + '</li>';

            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}

const requestLinkButton: HTMLElement | null = document.getElementById('request-links');

// If the button is found, bind the onclick event with the function handleClickGetLinks
if (requestLinkButton !== null)
    requestLinkButton.onclick = handleClickGetLinks;