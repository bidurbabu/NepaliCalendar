//(function () {

    // var displayMonth = 9;
    //var displayYear = 2069;
    var curDay;// = 17;
    // var curBar = 1;

    var curYear;// = 2069;
    var curMonth;// = 8;

    var curDate = new Date();
    var displayDate = new Date();//this should always represent the first day in Nepali Calendar in English
    var savedDate = new Date();
    var dayse = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    var days = new Array("आईतवार ", "सोमबार ", "मंगलवार", "बुद्धबार", "बिहीवार", "शुक्रबार", "शनिबार");
    var months = new Array("","बैशाख","जेष्ठ","आषाढ", "श्रावण", "भाद्र", "आश्विन","कार्तिक","मंसिर","पुष","माघ","फागुन","चैत");
    var monthse = new Array("", "Baishak", "Jetha", "Ashar", "Swran", "Badra", "Ashwoj", "Kartik", "Magsir", "Poush", "Marga", "Falgun", "Chaitra");
    var emonths = new Array("", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan");

    var curMonthTithis;
    var curMonthChads;
    var curMonthHolidays;
    var years =
    [[2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]];
    var monthStarts =
            [[2030, 5, 1, 5, 1, 5, 1, 3, 5, 0, 1, 2, 4],
            [2031, 0, 2, 6, 2, 6, 2, 4, 6, 1, 2, 4, 5],
            [2032, 1, 4, 0, 4, 0, 3, 6, 1, 2, 4, 5, 0],
            [2033, 2, 5, 1, 5, 2, 5, 0, 2, 3, 5, 6, 1],
            [2034, 3, 6, 3, 6, 3, 6, 1, 3, 5, 6, 0, 2],
            [2035, 5, 0, 4, 0, 4, 0, 3, 4, 6, 1, 2, 3],
            [2036, 6, 2, 5, 2, 5, 1, 4, 6, 0, 2, 3, 5],
            [2037, 0, 3, 6, 3, 0, 3, 5, 0, 1, 3, 4, 6],
            [2038, 1, 4, 1, 4, 1, 4, 6, 1, 3, 4, 5, 0],
            [2039, 3, 6, 2, 5, 2, 5, 1, 2, 4, 6, 0, 2],
            [2040, 4, 0, 3, 0, 3, 6, 2, 4, 5, 0, 1, 3],
            [2041, 5, 1, 4, 1, 5, 1, 3, 5, 6, 1, 2, 4],
            [2042, 6, 2, 6, 2, 6, 2, 4, 6, 1, 2, 3, 5],
            [2043, 1, 4, 0, 3, 0, 3, 6, 0, 2, 4, 5, 0],
            [2044, 2, 5, 1, 5, 1, 4, 0, 2, 3, 5, 6, 1],
            [2045, 3, 6, 3, 6, 3, 6, 1, 3, 4, 6, 0, 2],
            [2046, 4, 0, 4, 0, 4, 0, 2, 4, 6, 0, 1, 3],
            [2047, 6, 2, 5, 1, 5, 1, 4, 6, 0, 2, 3, 5],
            [2048, 0, 3, 6, 3, 6, 2, 5, 0, 1, 3, 4, 6],
            [2049, 1, 4, 1, 4, 1, 4, 6, 1, 3, 4, 5, 0],
            [2050, 2, 5, 2, 5, 2, 5, 0, 2, 4, 5, 0, 1],
            [2051, 4, 0, 3, 6, 3, 6, 2, 4, 5, 0, 1, 3],
            [2052, 5, 1, 4, 1, 4, 0, 3, 5, 6, 1, 2, 4],
            [2053, 6, 2, 6, 2, 6, 2, 4, 6, 1, 2, 3, 5],
            [2054, 0, 3, 0, 3, 0, 3, 5, 0, 2, 3, 5, 6],
            [2055, 2, 5, 1, 5, 1, 4, 0, 2, 3, 5, 6, 1],
            [2056, 3, 6, 2, 6, 2, 6, 1, 3, 4, 6, 0, 2],
            [2057, 4, 0, 4, 0, 4, 0, 2, 4, 6, 0, 1, 3],
            [2058, 6, 1, 5, 1, 5, 1, 3, 5, 0, 1, 3, 4],
            [2059, 0, 3, 6, 3, 6, 2, 5, 0, 1, 3, 4, 6],
            [2060, 1, 4, 0, 4, 1, 4, 6, 1, 2, 4, 5, 0],
            [2061, 2, 5, 2, 5, 2, 5, 0, 2, 4, 5, 6, 1],
            [2062, 4, 6, 3, 6, 3, 6, 2, 3, 5, 6, 1, 2],
            [2063, 5, 1, 4, 1, 4, 0, 3, 5, 6, 1, 2, 4],
            [2064, 6, 2, 5, 2, 6, 2, 4, 6, 0, 2, 3, 5],
            [2065, 0, 3, 0, 3, 0, 3, 5, 0, 2, 3, 4, 6],
            [2066, 2, 5, 1, 4, 1, 4, 0, 1, 3, 5, 6, 0],
            [2067, 3, 6, 2, 6, 2, 5, 1, 3, 4, 6, 0, 2],
            [2068, 4, 0, 3, 0, 4, 0, 2, 4, 5, 0, 1, 3],
            [2069, 5, 1, 5, 1, 5, 1, 3, 5, 0, 1, 2, 4],
            [2070, 0, 3, 6, 2, 6, 2, 5, 6, 1, 3, 4, 6],
            [2071, 1, 4, 0, 4, 0, 3, 6, 1, 2, 4, 5, 0],
            [2072, 2, 5, 2, 5, 2, 5, 0, 2, 3, 5, 6, 1],
            [2073, 3, 6, 3, 6, 3, 6, 1, 3, 5, 6, 0, 2],
            [2074, 5, 1, 4, 0, 4, 0, 3, 5, 6, 1, 2, 4],
            [2075, 6, 2, 5, 2, 5, 1, 4, 6, 0, 2, 3, 5],
            [2076, 0, 3, 0, 3, 0, 3, 5, 0, 2, 3, 4, 6],
            [2077, 1, 4, 1, 4, 1, 4, 6, 1, 3, 4, 6, 0],
            [2078, 3, 6, 2, 5, 2, 5, 1, 3, 4, 6, 0, 2],
            [2079, 4, 0, 3, 0, 3, 6, 2, 4, 5, 0, 1, 3],
            [2080, 5, 1, 5, 1, 5, 1, 3, 5, 0, 1, 2, 4]];


    function englishToNepali(dateString) {
        dateString = dateString + "";
        var dStrings = dateString.split('-');
        var eDate = new Date(parseInt(dStrings[0]), parseInt(dStrings[1]) - 1, parseInt(dStrings[2]));

        var sEYear = 1973;
        var sEMonth = 4;
        var sEDay = 13;

        var sNYear = 2030;
        var sNMonth = 1;
        var sNDay = 1;

        var sIYear = sNYear - 2030;
        var sBirthDay = new Date(sEYear, sEMonth - 1, sEDay);


        var dDifference = (eDate.getTime() - sBirthDay.getTime()) / (24 * 3600 * 1000);

        dDifference = dDifference - years[sIYear][sNMonth] + sNDay;//first month difference reduced
        dDifference = Math.floor(dDifference);

        sNMonth = sNMonth + 1;
        while (dDifference > 0) {
            dDifference = dDifference - years[sIYear][sNMonth];
            sNMonth = sNMonth + 1;
            if (sNMonth > 12) {
                sIYear = sIYear + 1;
                sNMonth = 1;
            }
        }
        sNMonth = sNMonth - 1;
        if (sNMonth == 0) {
            sNMonth = 12;
            sIYear = sIYear - 1;
        }
        var cYear = sIYear + 2030;
        var cDay = dDifference + years[sIYear][sNMonth];
        cDay = Math.ceil(cDay);
        var cMonth = sNMonth;
        if (cMonth == 0) { cMonth = 12; cYear = cYear - 1; }
        return cYear + "-" + cMonth + "-" + cDay+"-"+ days[eDate.getDay()];
    }
    function nepaliToEnglish(dateString) {

        var sEYear = 1973;
        var sEMonth = 4;
        var sEDay = 13;

        var sNYear = 2030;
        var sNMonth = 1;
        var sNDay = 1;

        var sIYear = sNYear - 2030;


        dateString = dateString + "";
        var dStrings = dateString.split('-');

        var dYear = parseInt(dStrings[0]);
        var dIYear = dYear - 2030;
        var dMonth = parseInt(dStrings[1]);
        var dDay = parseInt(dStrings[2]);

        var y = sIYear;
        var m = sNMonth;
        var diff = 0;
        while ((y != dIYear) || (m != dMonth)) {
            diff = diff + years[y][m];
            m = m + 1;
            if (m > 12) { m = 1; y = y + 1 }
        }

        diff = diff - sNDay;// Subtracting the first date
        diff = diff + dDay; //Adding the remainging days from final month

        var sBirthDay = new Date(sEYear, sEMonth - 1, sEDay);

        var MiliSecTime = sBirthDay.getTime() + diff * 24 * 3600 * 1000;

         sBirthDay.setDate(sBirthDay.getDate() + diff);

        var cMonth = sBirthDay.getMonth() + 1;
         return sBirthDay.getFullYear() + "-" + cMonth + "-" + sBirthDay.getDate()+"-"+ dayse[sBirthDay.getDay()];
    }

    function setCurrentMonthsTithis(m, y) {
        var my = "." + m + "." + y;
        if (m < 10) { my = ".0" + m + "." + y; }

        curMonthTithis = Enumerable.From(fullEventList)
            .Where(function (x) { return (x.Id.indexOf(my))>0})
            .Select(function (x) { return x.Tithi })
            .ToArray();
        //document.write(v[0]);
        $("#aajaDate #thithi").text(toStaticHTML(curMonthTithis[curDay-1]));
    }
    function setCurrentMonthsChads(m, y) {
        var my = "." + m + "." + y;
        if (m < 10) { my = ".0" + m + "." + y; }
        curMonthChads = Enumerable.From(fullEventList)
        .Where(function (x) {return (x.Id.indexOf(my))>0})
        .Select(function (x) {return x.Events})
        .ToArray();
        $("#aajaDate #chad").text(curMonthChads[curDay]);
        var curEvents = "";
        var curChad = curMonthChads[curDay - 1];
        if (curChad != null) {
            // var curChad2=curChad.split(',');
            for (var v = 0; v < curChad.length; v++) {
                curEvents = curEvents + toStaticHTML(curChad[v] +"<br/>");
            }
        }
        $("#aajaDate #chad").html(curEvents);

    }
    function setCurrentMonthsHolidays(m, y) {
        var my = "." + m + "." + y;
        if (m < 10) { my = ".0" + m + "." + y; }
        curMonthHolidays = Enumerable.From(fullEventList)
        .Where(function (x) { return (x.Id.indexOf(my)) > 0 })
        .Select(function (x) { return x.IsHoliday; })
        .ToArray();
    }
    function setCurrentNepaliDate() {
        var ey = curDate.getFullYear();
        var em = curDate.getMonth() + 1;
        var ed = curDate.getDate();
        var b=curDate.getDay();
        var es = ey + "-" + em + "-" + ed;
        var ns = englishToNepali(es);
        var nss = ns.split('-');
        var ny = nss[0];
        var nm = nss[1];
        var nd = nss[2];

        displayMonth = parseInt(nm);
        displayYear = parseInt(ny);
        curDay = parseInt(nd);

        curYear = displayYear;
        curMonth = displayMonth;
        displayDate.setDate(1);
        setCurrentMonthsTithis(displayMonth, displayYear);
        $("#aajaDate #nep").text(curYear+"-"+months[curMonth]+"-"+curDay+"-"+days[b]);
        $("#aajaDate #eng").text(ey + "-" + emonths[em] + "-" + ed + "-" + dayse[b]);

    }
    function setDisplayDate() {
        var engDate = nepaliToEnglish(displayYear + "-" + displayMonth + "-" + 1);
        engDateSplit = engDate.split("-");
        var y = parseInt(engDateSplit[0]);
        var m = parseInt(engDateSplit[1]) - 1;
        var d = parseInt(engDateSplit[2]);
        displayDate = new Date(y, m, d);
    }
    function bindNextAndPrevious() {
        $("#previousMonth").bind('click', function () {
            if ((displayYear > 2030) || (displayMonth > 1)) {
                previousMonthClick();
            }
        });
        $("#nextMonth").bind('click', function () {
            if ((displayYear < 2080)||(displayMonth<12)) {
                nextMonthClick();
            }
        });
        $("#goCurrentMonth").bind('click', function () {
            currentClick();
        });
        $("#previousYear").bind('click', function () {
            if (displayYear > 2030) {
                displayYear = displayYear - 1;
                yearSwitch();
            }
        });
        $("#nextYear").bind('click', function () {
            if (displayYear < 2080) {
                displayYear = displayYear + 1;
                yearSwitch();
            }
        });
    }

    function yearSwitch() {
      
            $("#nepaliDate").text(months[displayMonth] + " " + displayYear);
            var engDate = nepaliToEnglish(displayYear + "-" + displayMonth + "-" + 1);
            engDateSplit = engDate.split("-");
            var y = parseInt(engDateSplit[0]);
            var m = parseInt(engDateSplit[1]) - 1;
            var d = parseInt(engDateSplit[2]);
            displayDate = new Date(y, m, d);
            $("#englishDate").text(emonths[m + 1] + "/" + emonths[m + 2] + " " + y);
            createTable($("#calTable"));
        }
    
    function previousMonthClick() {
       
            if (displayMonth > 1) {
                displayMonth = displayMonth - 1;

            } else {
                displayMonth = 12;
                displayYear = displayYear - 1;

            }
            displayDate.setDate(displayDate.getDate() - years[displayYear - 2030][displayMonth]);
            $("#nepaliDate").text(months[displayMonth] + " " + displayYear);
            var m = parseInt(displayDate.getMonth()) + 1;
            var y = displayDate.getFullYear();
            $("#englishDate").text(emonths[m] + "/" + emonths[m + 1] + " " + y);

            createTable($("#calTable"));
        }
    
    function nextMonthClick() {
       
            displayDate.setDate(displayDate.getDate() + years[displayYear - 2030][displayMonth]);
            if (displayMonth < 12) {
                displayMonth = displayMonth + 1;
            } else {
                displayMonth = 1;
                displayYear = displayYear + 1;
                $("#CurrentYear").text(displayYear);
            }
            //curIndex = curIndex + 1;

            $("#nepaliDate").text(months[displayMonth] + " " + displayYear);
            var m = parseInt(displayDate.getMonth()) + 1;
            var y = displayDate.getFullYear();
            $("#englishDate").text(emonths[m] + "/" + emonths[m + 1] + " " + y);
            createTable($("#calTable"));
        }
    
    function currentClick() {

        displayMonth = curMonth;
        displayYear = curYear;
        $("#nepaliDate").text(months[displayMonth] + " " + displayYear);
        displayDate = new Date(savedDate.getFullYear(), savedDate.getMonth(), savedDate.getDate());
        var m = parseInt(displayDate.getMonth()) + 1;
        var y = displayDate.getFullYear();
        $("#englishDate").text(emonths[m] + "/" + emonths[m + 1] + " " + y);
        createTable($("#calTable"));
    }


    function createDynamicTable(tbody, startDay, endDay) {
        setDisplayDate();
        setCurrentMonthsTithis(displayMonth, displayYear);
        setCurrentMonthsChads(displayMonth, displayYear);
        setCurrentMonthsHolidays(displayMonth, displayYear);
        var d = displayDate;
        $("#calTable tr").remove();
        var rows = 6;
        var cols = 7;
        if (endDay > ((rows - 1) * 7 - startDay))
            rows = rows + 1;
        if (tbody == null || tbody.length < 1) return;
        for (var r = 1; r <= rows; r++) {
            var trow = $("<tr>");
            for (var c = 1; c <= cols; c++) {
                var className = "tableCell";
                var curtithi = "";
                var curEvents="";
              
                var dayhtml;
                var englishDay;
                var date = (r - 2) * 7 + c - startDay;

                var cellText = "" + date;
                if ((date >= 1) && (date <= endDay)) {
                   
                    if (curMonthHolidays[date - 1]) {
                        className = "holiday";
                    }
                    var tithi = curMonthTithis[date - 1];
                    if (tithi != null) {
                        curtithi = toStaticHTML(tithi);
                    }
                    var curChad = curMonthChads[date - 1];
                    if (curChad != null) {
                        // var curChad2=curChad.split(',');
                        for (var v = 0; v < curChad.length; v++) {
                            curEvents = curEvents + toStaticHTML(curChad[v]) + "<br />";
                        }
                    }
                    cellText = cellText;
                    englishDay = d.getDate();
                    d.setDate(d.getDate() + 1);
                }

                

                if (date < 1) cellText = "";
                if (date > endDay) cellText = "";
                if (r <= 1) {

                    dayhtml = '<div class="barr">' + dayse[c-1] + '<br />' + days[c-1] + '</div>';
                } else {
                    var beforeChad = '<div class="Day"><div class="left"></div> <div class="mid"><div class="top">';
                    var chad = curEvents;
                    var beforeNepaliDate = '</div> <div id="nepDate" class="nepDate">';
                    if ((date == curDay) && (curMonth == displayMonth) && (curYear == displayYear)) {
                        className = "Today";
                        cellText = cellText + ":आज";

                    } //today
                    var nepaliDay = cellText;
                    var beforeEnglishDay = '</div><div class="engDate">';

                    
                    if (cellText == "") { englishDay = ""; } //english day should be empty when there is no Nepali Date
                    var beforeTithi = '</div><div class="tithi">';
                    var tithi = curtithi;
                    var endhtml = '</div> <div class="bottom"></div></div><div></div></div>';
                    dayhtml = beforeChad + chad + beforeNepaliDate + nepaliDay + beforeEnglishDay + englishDay + beforeTithi + tithi + endhtml;
                }

                //add specific class to td to make them according to certain caase
               
                if (c == 7) { className = "Saturdays"; }
                

                var td1 = $("<td>")
                    .addClass(className)
                          .html(dayhtml);
                td1.appendTo(trow);    
            }
            trow.appendTo(tbody);
        }
        d.setDate(d.getDate() - endDay);
    }

    function createTable(tbody) {
        var yearI = displayYear - 2030;
        var startDay = monthStarts[yearI][displayMonth];
        var endDay = years[yearI][displayMonth];
        createDynamicTable(tbody, startDay, endDay);
    }

    function afterSuspension() {
        curDate = new Date();
        setCurrentNepaliDate();
        $("#CurrentYear").text(displayYear);
        $("#currentMonth").text(months[displayMonth]);

        createTable($("#calTable"));
        bindNextAndPrevious();
        currentClick();
        fillNepaliDateSelector();
        fillNepaliDateWithCurrentDate();
        renderConvertedEnglish();
    }

    $(document).ready(function () {
        afterSuspension();
       // curDate = new Date();
        //setCurrentNepaliDate();
        //$("#CurrentYear").text(displayYear);
        //$("#currentMonth").text(months[displayMonth]);

        //createTable($("#calTable"));
        //bindNextAndPrevious();
        //currentClick();
        //fillNepaliDateSelector();
        //fillNepaliDateWithCurrentDate();
        //renderConvertedEnglish();
        //Year Selection Area

        //var gestureRecognizer = new Windows.UI.Input.GestureRecognizer();
        //var v = document.getElementById("calTable");
        //gestureRecognizer.crossSlideHorizontally = true;
        //gestureRecognizer.GestureSettings = true;

        //gestureRecognizer.addEventListener('CrossSliding', onCrossSliding);
        ////gestureRecognizer.oncrosssliding = onCrossSliding;

      

      
    });

    function onCrossSliding() {
        nextMonthClick();
       // document.getElementById("nextMonth").click();
    }

    $.expr[":"].econtains = function (obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() == meta[3].toLowerCase();
    }
    function fillNepaliDateWithCurrentDate(){
    var dddd=curDay;
    var mmmm=months[displayMonth];
    var yyyy = displayYear;
    //var yyyy = "1981";
   // var mmmm = "2";
  //  var dddd = "3";
    $("#SelectYear option:econtains(" + yyyy + ")").attr('selected', '');
    $("#SelectMonth option:econtains(" + mmmm + ")").attr('selected', '');
    $("#SelectDay option:econtains(" + dddd + ")").attr('selected', '');       
    }
    function fillNepaliDateSelector() {

        var r = $("#SelectYear");
        var s = 2030;
        var e = 2080;

        fillSelect(r, s, e);
        r.change(function () {
            renderConvertedEnglish();
        });

        //Month Selection Area
        r = $("#SelectMonth");
        s = 1;
        e = 12;
      //  fillSelect(r, s, e);
        var options = '';
        for (var i = s; i <= e; i++) {

            options += '<option>' + months[i] + '</option>';
        }
        r.html(options);
        r.change(function () {
            renderConvertedEnglish();
        });

        r = $("#SelectDay");
        s = 1;
        e = 32;
        fillSelect(r, s, e);
        r.change(function () {
            renderConvertedEnglish();
        });
    }
        function fillSelect(root, start, end) {
            var options = '';
            for (var i = start; i <= end; i++) {
            
                options += '<option>' + i + '</option>';
            }
            root.html(options);
        }
        function renderConvertedEnglish() {
            var y = $("#SelectYear").val();
            var m = document.getElementById("SelectMonth").selectedIndex + 1;
            var d = $("#SelectDay").val();
            var dd = nepaliToEnglish(y + "-" + m + "-" + d);
            var engYear = document.getElementById("engYear");
            engYear.innerHTML = dd;
        }


        //})();
