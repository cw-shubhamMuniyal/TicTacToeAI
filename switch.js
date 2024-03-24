var selectAIMode = function () {
    $("#ai-mode").removeClass("bg-white font-green hover-text-white");
    $("#human-mode").addClass("bg-white font-green hover-text-white");
    setAiPlaying();
    setup();
}

var selectHumanMode = function () {
    $("#human-mode").removeClass("bg-white font-green hover-text-white");
    $("#ai-mode").addClass("bg-white font-green hover-text-white");
    setHumanPlaying();
    setup();
}
