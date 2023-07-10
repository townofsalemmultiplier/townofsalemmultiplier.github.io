
const cards = document.getElementsByClassName("card");
const player_boxes = document.getElementsByClassName("player")
const role_to_value = {"Bodyguard":4, "Deputy":4, "Doctor":4, "Investigator":6, "Mayor":8, "Medium":3, "Sheriff":7, "Survivor":4, "Veteran":3, "Vigilante":5, "Townie":1, "Peaceful Townie":-1, "Spiteful Townie":-1, "Politician":-2, "Godfather":-8, "Janitor":-8, "Mafioso":-6, "Consigliere":-10, "Blackmailer":-9, "Amnesiac":0, "Executioner":-4, "Jester":-1, "Serial Killer":-8, "Werewolf":-9, "Witch":-5};
const names = ["James", "Harrison", "Holly", "Alison", "Cheryl", "Phil", "Matt"];
let value = 0;

alert("This webpage is designed to be used on PC only, issues may be found if using on smaller screen devices. It is recommended this webpage is used with the browser in fullscreen mode.");

document.getElementById("questionmark").addEventListener("click", function(e) {
    alert("Use this webpage on PC, in fullscreen.\nDrag and drop cards onto respective players, and click cards to remove them from players.\nMultipliers are set to default yet can be edited if required using input boxes.\nIt's important to remember multipliers are estimates, and hence games values within the interval ±2 can be deemed reasonably balanced.")
});

for (card of cards) {
    card.addEventListener("dragstart", function(e) {
        selected_card = e.target;
    });
}

for (player_box of player_boxes) {

    player_box.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    player_box.addEventListener("drop", function(ev, tar) {

        if ((names.includes(ev.target.id)) && (ev.target.children.length < 3)) {

            //create new card and add
            clone = selected_card.cloneNode(true);
            ev.target.appendChild(clone);

            //set variables
            let name = ev.target.id;
            let multiplier = document.getElementById(name + " multiplier").value;
            let card_value = role_to_value[clone.id]
            let multiplied_value = card_value * multiplier;
            value += multiplied_value;

            document.getElementById(name + " value").innerHTML = "Player Value: " + Number(multiplied_value.toFixed(5)).toString();
            document.getElementById("value").innerHTML = "Value: " + Number(value.toFixed(5)).toString();


            //if card clicked to remove
            clone.addEventListener("click", function(e) {
                e.target.remove();
                document.getElementById(name + " value").innerHTML = "Player Value: 0";
                value -= multiplied_value;
                document.getElementById("value").innerHTML = "Value: " + Number(value.toFixed(5)).toString();
            });

        }
    });
}

