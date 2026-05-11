async function loadDailyLyric() {

    try {

        const response = await fetch("/lyrics.json");

        console.log(response);

        const lyrics = await response.json();

        console.log(lyrics);

        const today = new Date();

        const dayNumber = Math.floor(
            today.getTime() / (1000 * 60 * 60 * 24)
        );

        const lyric = lyrics[dayNumber % lyrics.length];

        document.getElementById("dailyLyric").textContent =
            `"${lyric}"`;

    }
    catch (error) {

        console.error(error);

        document.getElementById("dailyLyric").textContent =
            `"The static grows louder."`;
    }
}

loadDailyLyric();