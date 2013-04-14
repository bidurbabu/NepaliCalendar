// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;
   
    var app = WinJS.Application;
    var webUIApplication = Windows.UI.WebUI.WebUIApplication;
    var activation = Windows.ApplicationModel.Activation;
    // Declare a variable that you will use as an instance of an object
   
    var audtag = null;
    var mediaControl;

    
    
    function onResuming(eventArgs) {
        afterSuspension();
        /* Your code */
    }

    // addEventListener syntax
    webUIApplication.addEventListener("resuming", onResuming);

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
              
              //  afterSuspension();

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.

               // afterSuspension();
            }
            args.setPromise(WinJS.UI.processAll());
            addSettings();
        }

        beforeLunch();
    };
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    window.addEventListener("resize", onResize);
    app.start();
    function beforeLunch() {
        var list = new WinJS.Binding.List;
        var selectStation = document.getElementById("stationSelect");
        var result;
        var innerhtml;
       // WinJS.xhr({ url: "https://raw.github.com/nepali/nepali.github.com/master/d/v8aVe1teymjXiH" }).done(function (a) {
        WinJS.xhr({ url: "https://raw.github.com/bidurbabu/bidurbabu/gh-pages/radiojson" }).done(function (a) {

            
            result =JSON.parse(a.responseText).forEach(function (a) { 
                list.push({ title: a.Title, url: a.Media, desc: a.Description })
                innerhtml=innerhtml+'<option value="'+a.Media+'" title="'+a.Title+'">'+a.Title+'</option>';
            });
            selectStation.innerHTML = innerhtml;
        });
        var dateDiv = document.getElementById("date");
        var datePicker = new WinJS.UI.DatePicker(dateDiv);
        datePicker.minYear = 1974;
        datePicker.maxYear = 2023;
        dateDiv.setAttribute("style", "width:400px");
        handler(datePicker);
        datePicker.addEventListener("change", function () {
            handler(datePicker);
        });

        var clockDiv = document.getElementById("aajaTime");

  
       // audioFirstRun();

    }
    function onResize() {
        // Update view for the new window size
        updateView();
    }
    function updateView() {
        // Query for the current view state
        var myViewState = Windows.UI.ViewManagement.ApplicationView.value;

        var viewStates = Windows.UI.ViewManagement.ApplicationViewState;
        var statusText;

        // Assign text according to view state
        switch (myViewState) {
            case viewStates.snapped:
                {
                    document.getElementById("CalendarSection").style.visibility = 'collapse';
                    document.getElementById("rightView").style.visibility = 'visible';

                    //document.getElementById("rightView").style
                    //  $("#CalendarSection").hide();

                    break;
                }

            case viewStates.filled:
                {
                    document.getElementById("CalendarSection").style.visibility = 'visible';
                    document.getElementById("rightView").style.visibility = 'collapse';
                    break;
                }
            default:
                {
                    document.getElementById("CalendarSection").style.visibility = 'visible';
                    document.getElementById("rightView").style.visibility = 'visible';
                    break;
                }
        }

        // Display text
       // WinJS.log && WinJS.log(statusText, "sample", "status");
    }
    setInterval(function () {
        var d = new Date();
        var newDate = new Date();
        var seconds = newDate.getSeconds();
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);

    }, 1000);
    setInterval(function () {
        var d = new Date();

        var newDate = new Date();
        var minutes = newDate.getMinutes();
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {

        var amPM = "AM";
        var d = new Date();

        var newDate = new Date();
        var hours = newDate.getHours();
        if (hours >= 13) {
            var newhours = hours - 12;
        } else {
            var newhours = hours;
        }
        if (hours >= 12) {
            $("#ampm").html(" PM");
            amPM = "PM";
        } else {
            $("#ampm").html(" AM");
            if (amPM == "PM") {
                afterSuspension();
                amPM = "AM";
            }
            amPM = "AM";
        }
        if (hours < 1) {
            newhours = '12';
            hours = 12;
        }
        $("#hours").html((hours < 10 ? "0" : "") + newhours);
    }, 1000);

    function handler(dtPicker) {
        //var dtPicker = document.getElementById("date");
        //var dtPicker1 = new WinJS.UI.DatePicker(dtPicker);
        var dt = dtPicker.current;
        var ny = dt.getFullYear();
        var nm = dt.getMonth() + 1;
        var nd = dt.getDate();

        var d = englishToNepali(ny + "-" + nm + "-" + nd);
        var nepYear = document.getElementById("nepYear");
        //var d = (dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate());
        nepYear.innerHTML = d;
    }
    function addSettings() {
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "support": { title: "Support", href: "/support.html" },
                "privacy": { title: "Privacy Policy", href: "/privacy.html" }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };

      
    }
    
    var page = WinJS.UI.Pages.define("/default.html", {
        ready: function (element, options) {
            var FMsrc = $("#stationSelect").val();
            var FMtrack = $('#stationSelect option:selected').text()
            $("#FmStationName").html("<h3>" + FMtrack + "</h3>");
            $("#stationSelect").change(function () {
                changeStation();
            });
            doSomething1();
        },

        unload: function () {

            // Remove the audio tag and then null it.
            // Then unload event listeners so you don't press play on another media element you switched from.

            if (audtag) {
                document.getElementById("MediaElement").removeChild(audtag);
            }
            audtag = null;
            if (mediaControl) {
                mediaControl.removeEventListener("playpausetogglepressed", playpause, false);
                mediaControl.removeEventListener("playpressed", play, false);
                mediaControl.removeEventListener("stoppressed", stop, false);
                mediaControl.removeEventListener("pausepressed", pause, false);
                mediaControl.removeEventListener("soundlevelchanged", soundLevelChanged, false);
            }
        }
    });

    function changeStation() {
        if (audtag) {

            var FMtrack = $('#stationSelect option:selected').text();
            var fm = $('#stationSelect option:selected').val();
            $("#FmStationName").html("<h3>Playing: " + FMtrack + "</h3>");

            //audtag.setAttribute("src", "http://202.166.217.123:89/broadwave.mp3");
            audtag.setAttribute("src",fm);
            audtag.load();


        }
    }
    function doSomething1() {


        mediaControl = Windows.Media.MediaControl;

        // Add event listeners for PBM notifications to illustrate app is
        // getting a new SoundLevel and pass the audio tag along to the function

        mediaControl.addEventListener("soundlevelchanged", soundLevelChanged, false);

        // Add event listeners for the mandatory media commands.
        // These are necessary to play streams of type 'backgroundCapableMedia'
        mediaControl.addEventListener("playpausetogglepressed", playpause, false);
        mediaControl.addEventListener("playpressed", play, false);
        mediaControl.addEventListener("stoppressed", stop, false);
        mediaControl.addEventListener("pausepressed", pause, false);

       // var fileLocation = window.URL.createObjectURL(file, { oneTimeOnly: true });

        if (!audtag) {
            audtag = document.createElement('audio');
            audtag.setAttribute("id", "audtag");
            audtag.setAttribute("controls", "true");
            audtag.setAttribute("style", "width:320px");
            audtag.setAttribute("msAudioCategory", "BackgroundCapableMedia");
            audtag.setAttribute("src", "http://202.166.217.123:89/broadwave.mp3");
            document.getElementById("MediaElement").appendChild(audtag);
            audtag.load();
            //WinJS.log && WinJS.log("Audio Tag Loaded", "sample", "status");
            //log(getTimeStampedMessage("test"));
        }


    }
    function playpause() {
        // Handle the Play/Pause event and print status to screen.
        //WinJS.log && WinJS.log("Play/Pause Received", "sample", "status");
        if (!audtag.paused) {
            audtag.pause();
            Windows.Media.MediaControl.isPlaying = false;
        } else {
            audtag.play();
            Windows.Media.MediaControl.isPlaying = true;
        }
    }

    function play() {
        // Handle the Play event and print status to screen..
        //WinJS.log && WinJS.log("Play Received", "sample", "status");
        audtag.play();
        Windows.Media.MediaControl.isPlaying = true;
    }

    function stop() {
        // Handle the Stop event and print status to screen.
        WinJS.log && WinJS.log("Stop Received (but a media element can't 'stop', so just diplaying text.", "sample", "status");
    }

    function pause() {
        // Handle the Pause event and print status to screen.
        //WinJS.log && WinJS.log("Pause Received", "sample", "status");
        audtag.pause();
        Windows.Media.MediaControl.isPlaying = false;
    }

    function soundLevelChanged() {

        //Catch SoundLevel notifications and determine SoundLevel state.  If it's muted, we'll pause the player.
        //If your app is playing media you feel that a user should not miss if a VOIP call comes in, you may
        //want to consider pausing playback when your app receives a SoundLevel(Low) notification.
        //A SoundLevel(Low) means your app volume has been attenuated by the system (likely for a VOIP call).

        var soundLevel = Windows.Media.MediaControl.soundLevel;


        switch (soundLevel) {

            case Windows.Media.SoundLevel.muted:
               // log(getTimeStampedMessage("App sound level is: Muted"));
                break;
            case Windows.Media.SoundLevel.low:
               // log(getTimeStampedMessage("App sound level is: Low"));
                break;
            case Windows.Media.SoundLevel.full:
               // log(getTimeStampedMessage("App sound level is: Full"));
                break;
        }


        appMuted();
    }

    function appMuted() {

        if (audtag) {
            if (!audtag.paused) {
                audtag.pause();
                Windows.Media.MediaControl.isPlaying = false;
               // WinJS.log && WinJS.log("Audio Paused", "sample", "status");
            }
        }
    }

})();
