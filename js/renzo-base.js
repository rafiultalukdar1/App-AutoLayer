document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // Tooltip buttons
    // ==========================================

    const tooltipButtons = document.querySelectorAll(".ToolTipBtn");

    tooltipButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            this.classList.toggle("active");

            const parentLi = this.closest("li");

            if (parentLi) {
                const tooltipBottom = parentLi.querySelector(".tooltip-bottom");

                if (tooltipBottom) {
                    tooltipBottom.classList.toggle("active");
                }
            }
        });
    });

    // ==========================================
    // Check ECharts
    // ==========================================

    if (typeof echarts === "undefined") {
        return;
    }

    // ==========================================
    // Chart 1 - APY Overtime
    // ==========================================

    const directionMap = {};

    [
        "W",
        "WSW",
        "SW",
        "SSW",
        "S",
        "SSE",
        "SE",
        "ESE",
        "E",
        "ENE",
        "NE",
        "NNE",
        "N",
        "NNW",
        "NW",
        "WNW",
    ].forEach(function (name, index) {
        directionMap[name] = (Math.PI / 8) * index;
    });

    const rawData = {
        data: [
            {
                time: 1667845200000,
                windSpeed: 12,
                R: "N",
                waveHeight: 2.97,
            },
            {
                time: 1667852400000,
                windSpeed: 15,
                R: "NNE",
                waveHeight: 3,
            },
            {
                time: 1667859600000,
                windSpeed: 16,
                R: "NE",
                waveHeight: 2.9,
            },
            {
                time: 1667866800000,
                windSpeed: 10,
                R: "E",
                waveHeight: 3,
            },
            {
                time: 1667874000000,
                windSpeed: 9,
                R: "SE",
                waveHeight: 3.1,
            },
            {
                time: 1667881200000,
                windSpeed: 14,
                R: "S",
                waveHeight: 4,
            },
            {
                time: 1667888400000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 3.8,
            },
            {
                time: 1667888500000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 5,
            },
            {
                time: 1667888600000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 6,
            },
            {
                time: 1667888700000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 4.48,
            },
            {
                time: 1667888800000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 5.2,
            },
            {
                time: 1667888900000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 5.4,
            },
            {
                time: 1667889100000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 5.5,
            },
            {
                time: 1667889200000,
                windSpeed: 18,
                R: "SW",
                waveHeight: 5.2,
            },
        ],

        forecast: [
            {
                localDate: 1667845200000,
                skyIcon: "sunny",
                minTemp: 22,
                maxTemp: 28,
            },
            {
                localDate: 1667852400000,
                skyIcon: "cloudy",
                minTemp: 20,
                maxTemp: 25,
            },
            {
                localDate: 1667859600000,
                skyIcon: "cloudy",
                minTemp: 18,
                maxTemp: 24,
            },
        ],
    };

    const data = rawData.data.map(function (entry) {
        return [
            entry.time,
            entry.windSpeed,
            entry.R,
            entry.waveHeight,
        ];
    });

    const weatherData = rawData.forecast.map(function (entry) {
        return [
            entry.localDate,
            0,
            entry.minTemp,
            entry.maxTemp,
        ];
    });

    const dims = {
        time: 0,
        windSpeed: 1,
        R: 2,
        waveHeight: 3,
        weatherIcon: 2,
        minTemp: 3,
        maxTemp: 4,
    };

    const weatherIconSize = 45;

    const renderWeather = function (param, api) {
        const point = api.coord([
            api.value(dims.time) + (3600 * 24 * 1000) / 2,
            0,
        ]);
    };

    const option = {
        tooltip: {
            trigger: "axis",

            formatter: function (params) {
                return [
                    echarts.format.formatTime(
                        "yyyy-MM-dd hh:mm",
                        params[0].value[dims.time]
                    ) +
                        " " +
                        echarts.format.formatTime(
                            "hh:mm",
                            params[0].value[dims.time]
                        ),

                    "浪高：" +
                        params[0].value[dims.waveHeight],
                ].join("<br>");
            },
        },

        grid: {
            top: 20,
            bottom: 25,
            left: 0,
        },

        xAxis: {
            type: "time",

            maxInterval: 3600 * 1000 * 24,

            splitLine: {
                lineStyle: {
                    color: "#ddd",
                },
            },
        },

        yAxis: [
            {
                name: "",
                nameLocation: "middle",
                nameGap: 1,
                max: 6.98,
                position: "right",

                axisLine: {
                    lineStyle: {
                        color: "#015DD5",
                    },
                },

                splitLine: {
                    lineStyle: {
                        color: "#ddd",
                    },
                },

                axisLabel: {
                    formatter: "{value}",
                    fontSize: 14,
                    color: "#333",
                },

                title: {
                    text: "API%",

                    textStyle: {
                        fontSize: 16,
                        color: "#000",
                    },

                    padding: [0, 0, 10, 20],
                },
            },

            {
                axisLine: {
                    show: false,
                },

                axisTick: {
                    show: false,
                },

                axisLabel: {
                    show: false,
                },

                splitLine: {
                    show: false,
                },
            },
        ],

        dataZoom: [
            {
                type: "inside",
                xAxisIndex: 0,
                minSpan: 5,
            },

            {
                type: "slider",
                xAxisIndex: 0,
                minSpan: 5,
                bottom: 50,
            },
        ],

        series: [
            {
                type: "line",
                yAxisIndex: 0,
                showSymbol: false,

                emphasis: {
                    scale: false,
                },

                symbolSize: 10,

                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        global: false,

                        colorStops: [
                            {
                                offset: 0,
                                color: "rgba(88,160,253,0.3)",
                            },

                            {
                                offset: 0.3,
                                color: "rgba(88,160,253,0.2)",
                            },

                            {
                                offset: 0.8,
                                color: "rgba(88,160,253,0)",
                            },
                        ],
                    },
                },

                lineStyle: {
                    color: "rgba(88,160,253,1)",
                },

                itemStyle: {
                    color: "rgba(88,160,253,1)",
                },

                encode: {
                    x: dims.time,
                    y: dims.waveHeight,
                },

                data: data,
                z: 2,
            },

            {
                type: "custom",

                renderItem: renderWeather,

                data: weatherData,

                tooltip: {
                    trigger: "item",

                    formatter: function (param) {
                        return (
                            param.value[dims.time] +
                            ": " +
                            param.value[dims.minTemp] +
                            " - " +
                            param.value[dims.maxTemp] +
                            "°"
                        );
                    },
                },

                yAxisIndex: 1,
                z: 11,
            },
        ],
    };

    const mainElement = document.getElementById("main");

    if (mainElement) {
        const myChart = echarts.init(mainElement);

        myChart.setOption(option);

        const zoomOption = {
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 100,
                },

                {
                    type: "slider",
                    start: 0,
                    end: 100,
                    bottom: 50,
                },
            ],
        };

        document
            .getElementById("btn1d")
            ?.addEventListener("click", function () {
                const oneDay = 3600 * 1000 * 24;
                myChart.setOption(zoomOption);
            });

        document
            .getElementById("btn7d")
            ?.addEventListener("click", function () {
                const sevenDays = 3600 * 1000 * 24 * 7;
                myChart.setOption(zoomOption);
            });

        document
            .getElementById("btn1m")
            ?.addEventListener("click", function () {
                const oneMonth = 3600 * 1000 * 24 * 30;
                myChart.setOption(zoomOption);
            });

        document
            .getElementById("btn1y")
            ?.addEventListener("click", function () {
                const oneYear = 3600 * 1000 * 24 * 365;
                myChart.setOption(zoomOption);
            });

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    // ==========================================
    // Chart 2 - Risk Factor Overtime
    // ==========================================

    const windDirectionMap = {};

    [
        "W",
        "WSW",
        "SW",
        "SSW",
        "S",
        "SSE",
        "SE",
        "ESE",
        "E",
        "ENE",
        "NE",
        "NNE",
        "N",
        "NNW",
        "NW",
        "WNW",
    ].forEach(function (direction, index) {
        windDirectionMap[direction] = (Math.PI / 8) * index;
    });

    const weatherData2 = {
        dataPoints: [
            {
                time: 1667845200000,
                windSpeed: 12,
                direction: "N",
                waveHeight: 52,
            },
            {
                time: 1667852400000,
                windSpeed: 15,
                direction: "NNE",
                waveHeight: 52,
            },
            {
                time: 1667859600000,
                windSpeed: 16,
                direction: "NE",
                waveHeight: 52,
            },
            {
                time: 1667866800000,
                windSpeed: 10,
                direction: "E",
                waveHeight: 52,
            },
            {
                time: 1667874000000,
                windSpeed: 9,
                direction: "SE",
                waveHeight: 52,
            },
            {
                time: 1667881200000,
                windSpeed: 14,
                direction: "S",
                waveHeight: 52,
            },
            {
                time: 1667888400000,
                windSpeed: 18,
                direction: "SW",
                waveHeight: 52,
            },
            {
                time: 1667888400000,
                windSpeed: 18,
                direction: "SW",
                waveHeight: 52,
            },
            {
                time: 1667888400000,
                windSpeed: 18,
                direction: "SW",
                waveHeight: 52,
            },
        ],

        forecastData: [
            {
                localDate: 1667845200000,
                skyIcon: "sunny",
                minTemp: 22,
                maxTemp: 28,
            },
            {
                localDate: 1667852400000,
                skyIcon: "cloudy",
                minTemp: 20,
                maxTemp: 25,
            },
            {
                localDate: 1667859600000,
                skyIcon: "cloudy",
                minTemp: 18,
                maxTemp: 24,
            },
        ],
    };

    const chartData = weatherData2.dataPoints.map(function (entry) {
        return [
            entry.time,
            entry.windSpeed,
            entry.direction,
            entry.waveHeight,
        ];
    });

    const forecastData = weatherData2.forecastData.map(function (entry) {
        return [
            entry.localDate,
            0,
            entry.minTemp,
            entry.maxTemp,
        ];
    });

    const axisDims = {
        time: 0,
        windSpeed: 1,
        direction: 2,
        waveHeight: 3,
        weatherIcon: 2,
        minTemp: 3,
        maxTemp: 4,
    };

    const iconSize = 45;

    const generateWeatherIcons = function (params, api) {
        const point = api.coord([
            api.value(axisDims.time) + (3600 * 24 * 1000) / 2,
            0,
        ]);
    };

    const chartOptions = {
        tooltip: {
            trigger: "axis",

            formatter: function (params) {
                return [
                    echarts.format.formatTime(
                        "yyyy-MM-dd hh:mm",
                        params[0].value[axisDims.time]
                    ) +
                        " " +
                        echarts.format.formatTime(
                            "hh:mm",
                            params[0].value[axisDims.time]
                        ),

                    "Wave Height: " +
                        params[0].value[axisDims.waveHeight],
                ].join("<br>");
            },
        },

        grid: {
            top: 20,
            bottom: 25,
            left: 0,
        },

        xAxis: {
            type: "time",

            maxInterval: 3600 * 1000 * 24,

            splitLine: {
                lineStyle: {
                    color: "#ddd",
                },
            },
        },

        yAxis: [
            {
                name: "",
                nameLocation: "middle",
                nameGap: 10,
                max: 54,
                position: "right",

                axisLine: {
                    lineStyle: {
                        color: "#015DD5",
                    },
                },

                splitLine: {
                    lineStyle: {
                        color: "#ddd",
                    },
                },

                axisLabel: {
                    formatter: "{value}",
                    fontSize: 14,
                    color: "#333",
                },

                title: {
                    text: "API%",

                    textStyle: {
                        fontSize: 16,
                        color: "#000",
                    },

                    padding: [0, 0, 10, 20],
                },
            },

            {
                axisLine: {
                    show: false,
                },

                axisTick: {
                    show: false,
                },

                axisLabel: {
                    show: false,
                },

                splitLine: {
                    show: false,
                },
            },
        ],

        dataZoom: [
            {
                type: "inside",
                xAxisIndex: 0,
                minSpan: 5,
            },

            {
                type: "slider",
                xAxisIndex: 0,
                minSpan: 5,
                bottom: 50,
            },
        ],

        series: [
            {
                type: "line",
                yAxisIndex: 0,
                showSymbol: false,

                emphasis: {
                    scale: false,
                },

                symbolSize: 10,

                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        global: false,

                        colorStops: [
                            {
                                offset: 0,
                                color: "rgba(19,219,15,0.1)",
                            },

                            {
                                offset: 0.2,
                                color: "rgba(19,219,15,0.1)",
                            },

                            {
                                offset: 0.8,
                                color: "rgba(19,219,15,0)",
                            },
                        ],
                    },
                },

                lineStyle: {
                    color: "rgba(19,219,15,1)",
                },

                itemStyle: {
                    color: "rgba(19,219,15,1)",
                },

                encode: {
                    x: axisDims.time,
                    y: axisDims.waveHeight,
                },

                data: chartData,
                z: 2,
            },

            {
                type: "line",
                yAxisIndex: 0,
                showSymbol: false,

                emphasis: {
                    scale: false,
                },

                symbolSize: 10,

                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        global: false,

                        colorStops: [
                            {
                                offset: 0,
                                color: "rgba(255,0,0,0.1)",
                            },

                            {
                                offset: 0.4,
                                color: "rgba(255,0,0,0)",
                            },
                        ],
                    },
                },

                lineStyle: {
                    color: "rgba(255,0,0,1)",
                },

                itemStyle: {
                    color: "rgba(255,0,0,1)",
                },

                encode: {
                    x: axisDims.time,
                    y: axisDims.waveHeight,
                },

                data: chartData.map(function (entry, index) {
                    return [
                        entry[0],
                        index % 2 === 0
                            ? entry[axisDims.waveHeight]
                            : entry[axisDims.waveHeight] - 2,
                    ];
                }),

                z: 3,
            },

            {
                type: "custom",

                renderItem: generateWeatherIcons,

                data: forecastData,

                tooltip: {
                    trigger: "item",

                    formatter: function (param) {
                        return (
                            param.value[axisDims.time] +
                            ": " +
                            param.value[axisDims.minTemp] +
                            " - " +
                            param.value[axisDims.maxTemp] +
                            "°"
                        );
                    },
                },

                yAxisIndex: 1,
                z: 11,
            },
        ],
    };

    const chartUpDownElement =
        document.getElementById("chartUpDown");

    if (chartUpDownElement) {
        const chartInstance =
            echarts.init(chartUpDownElement);

        chartInstance.setOption(chartOptions);

        const riskZoomOption = {
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 100,
                },

                {
                    type: "slider",
                    start: 0,
                    end: 100,
                    bottom: 50,
                },
            ],
        };

        document
            .getElementById("riskBtn1d")
            ?.addEventListener("click", function () {
                const oneDay = 3600 * 1000 * 24;
                chartInstance.setOption(riskZoomOption);
            });

        document
            .getElementById("riskBtn7d")
            ?.addEventListener("click", function () {
                const sevenDays = 3600 * 1000 * 24 * 7;
                chartInstance.setOption(riskZoomOption);
            });

        document
            .getElementById("riskBtn1m")
            ?.addEventListener("click", function () {
                const oneMonth = 3600 * 1000 * 24 * 30;
                chartInstance.setOption(riskZoomOption);
            });

        document
            .getElementById("riskBtn1y")
            ?.addEventListener("click", function () {
                const oneYear = 3600 * 1000 * 24 * 365;
                chartInstance.setOption(riskZoomOption);
            });

        window.addEventListener("resize", function () {
            chartInstance.resize();
        });
    }
});