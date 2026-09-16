document.addEventListener("DOMContentLoaded", function () {
    /*
    ============================================================
    TOOLTIP BUTTONS
    ============================================================
    */

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


    /*
    ============================================================
    CHART 1 - APY OVERTIME
    ============================================================
    */

    const chartElement = document.getElementById("main");

    if (chartElement && typeof echarts !== "undefined") {
        const rawData = {
            data: [
                {
                    time: 1667845200000,
                    windSpeed: 12,
                    R: "N",
                    waveHeight: 2.5
                },
                {
                    time: 1667852400000,
                    windSpeed: 15,
                    R: "NNE",
                    waveHeight: 3
                },
                {
                    time: 1667859600000,
                    windSpeed: 16,
                    R: "NE",
                    waveHeight: 4.5
                },
                {
                    time: 1667866800000,
                    windSpeed: 10,
                    R: "E",
                    waveHeight: 3
                },
                {
                    time: 1667874000000,
                    windSpeed: 9,
                    R: "SE",
                    waveHeight: 3.1
                },
                {
                    time: 1667881200000,
                    windSpeed: 14,
                    R: "S",
                    waveHeight: 4
                },
                {
                    time: 1667888400000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 2.22
                },
                {
                    time: 1667888500000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 5
                },
                {
                    time: 1667888600000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 6
                },
                {
                    time: 1667888700000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 4.48
                },
                {
                    time: 1667888800000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 5.2
                },
                {
                    time: 1667888900000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 4.4
                },
                {
                    time: 1667889100000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 5.5
                },
                {
                    time: 1667889200000,
                    windSpeed: 18,
                    R: "SW",
                    waveHeight: 5.2
                }
            ],

            forecast: [
                {
                    localDate: 1667845200000,
                    skyIcon: "sunny",
                    minTemp: 22,
                    maxTemp: 28
                },
                {
                    localDate: 1667852400000,
                    skyIcon: "cloudy",
                    minTemp: 20,
                    maxTemp: 25
                },
                {
                    localDate: 1667859600000,
                    skyIcon: "cloudy",
                    minTemp: 18,
                    maxTemp: 24
                }
            ]
        };


        const data = rawData.data.map(function (entry) {
            return [
                entry.time,
                entry.windSpeed,
                entry.R,
                entry.waveHeight
            ];
        });


        const weatherData = rawData.forecast.map(function (entry) {
            return [
                entry.localDate,
                0,
                entry.minTemp,
                entry.maxTemp
            ];
        });


        const dims = {
            time: 0,
            windSpeed: 1,
            R: 2,
            waveHeight: 3,
            weatherIcon: 2,
            minTemp: 3,
            maxTemp: 4
        };


        const renderWeather = function (param, api) {
            const point = api.coord([
                api.value(dims.time) + (3600 * 24 * 1000) / 2,
                0
            ]);

            return {
                type: "group",
                x: point[0],
                y: point[1]
            };
        };


        const option = {
            tooltip: {
                trigger: "axis",

                formatter: function (params) {
                    if (!params || !params.length) {
                        return "";
                    }

                    const item = params[0];

                    return [
                        echarts.format.formatTime(
                            "yyyy-MM-dd hh:mm",
                            item.value[dims.time]
                        ),
                        "APY: " + item.value[dims.waveHeight] + "%"
                    ].join("<br>");
                }
            },

            grid: {
                top: 20,
                bottom: 25,
                left: 0,
                right: 50
            },

            xAxis: {
                type: "time",

                maxInterval: 3600 * 1000 * 24,

                splitLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                }
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
                            color: "#015DD5"
                        }
                    },

                    splitLine: {
                        lineStyle: {
                            color: "#ddd"
                        }
                    },

                    axisLabel: {
                        formatter: "{value}",

                        fontSize: 14,

                        color: "#333"
                    }
                },

                {
                    axisLine: {
                        show: false
                    },

                    axisTick: {
                        show: false
                    },

                    axisLabel: {
                        show: false
                    },

                    splitLine: {
                        show: false
                    }
                }
            ],

            dataZoom: [
                {
                    type: "inside",

                    xAxisIndex: 0,

                    minSpan: 5
                },

                {
                    type: "slider",

                    xAxisIndex: 0,

                    minSpan: 5,

                    bottom: 50
                }
            ],

            series: [
                {
                    type: "line",

                    yAxisIndex: 0,

                    showSymbol: false,

                    emphasis: {
                        scale: false
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
                                    color: "rgba(88,160,253,0.3)"
                                },
                                {
                                    offset: 0.3,
                                    color: "rgba(88,160,253,0.2)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(88,160,253,0)"
                                }
                            ]
                        }
                    },

                    lineStyle: {
                        color: "rgba(88,160,253,1)"
                    },

                    itemStyle: {
                        color: "rgba(88,160,253,1)"
                    },

                    encode: {
                        x: dims.time,
                        y: dims.waveHeight
                    },

                    data: data,

                    z: 2
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
                        }
                    },

                    yAxisIndex: 1,

                    z: 11
                }
            ]
        };


        const myChart = echarts.init(chartElement);

        myChart.setOption(option);


        /*
        ------------------------------------------------------------
        APY TIME BUTTONS
        ------------------------------------------------------------
        */

        function setApyRange(buttonId) {
            const buttons = document.querySelectorAll(
                ".token-apy-time-chart:first-of-type .chart-filter-btn button"
            );

            buttons.forEach(function (button) {
                button.classList.remove("active");
            });

            const selectedButton = document.getElementById(buttonId);

            if (selectedButton) {
                selectedButton.classList.add("active");
            }

            myChart.setOption({
                dataZoom: [
                    {
                        type: "inside",
                        start: 0,
                        end: 100
                    },
                    {
                        type: "slider",
                        start: 0,
                        end: 100,
                        bottom: 50
                    }
                ]
            });
        }


        const btn1d = document.getElementById("btn1d");
        const btn7d = document.getElementById("btn7d");
        const btn1m = document.getElementById("btn1m");
        const btn1y = document.getElementById("btn1y");


        if (btn1d) {
            btn1d.addEventListener("click", function () {
                setApyRange("btn1d");
            });
        }


        if (btn7d) {
            btn7d.addEventListener("click", function () {
                setApyRange("btn7d");
            });
        }


        if (btn1m) {
            btn1m.addEventListener("click", function () {
                setApyRange("btn1m");
            });
        }


        if (btn1y) {
            btn1y.addEventListener("click", function () {
                setApyRange("btn1y");
            });
        }


        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


    /*
    ============================================================
    CHART 2 - RISK FACTOR OVERTIME
    ============================================================
    */

    const riskChartElement = document.getElementById("chartUpDown");

    if (riskChartElement && typeof echarts !== "undefined") {
        const weatherData2 = {
            dataPoints: [
                {
                    time: 1667845200000,
                    windSpeed: 12,
                    direction: "N",
                    waveHeight: 12
                },
                {
                    time: 1667852400000,
                    windSpeed: 15,
                    direction: "NNE",
                    waveHeight: 32
                },
                {
                    time: 1667859600000,
                    windSpeed: 16,
                    direction: "NE",
                    waveHeight: 20
                },
                {
                    time: 1667866800000,
                    windSpeed: 10,
                    direction: "E",
                    waveHeight: 38
                },
                {
                    time: 1667874000000,
                    windSpeed: 9,
                    direction: "SE",
                    waveHeight: 40
                },
                {
                    time: 1667881200000,
                    windSpeed: 14,
                    direction: "S",
                    waveHeight: 52
                },
                {
                    time: 1667888400000,
                    windSpeed: 18,
                    direction: "SW",
                    waveHeight: 42
                },
                {
                    time: 1667888500000,
                    windSpeed: 18,
                    direction: "SW",
                    waveHeight: 52
                },
                {
                    time: 1667888600000,
                    windSpeed: 18,
                    direction: "SW",
                    waveHeight: 50
                }
            ],

            forecastData: [
                {
                    localDate: 1667845200000,
                    skyIcon: "sunny",
                    minTemp: 22,
                    maxTemp: 28
                },
                {
                    localDate: 1667852400000,
                    skyIcon: "cloudy",
                    minTemp: 20,
                    maxTemp: 25
                },
                {
                    localDate: 1667859600000,
                    skyIcon: "cloudy",
                    minTemp: 18,
                    maxTemp: 24
                }
            ]
        };


        const chartData = weatherData2.dataPoints.map(function (entry) {
            return [
                entry.time,
                entry.windSpeed,
                entry.direction,
                entry.waveHeight
            ];
        });


        const forecastData = weatherData2.forecastData.map(function (entry) {
            return [
                entry.localDate,
                0,
                entry.minTemp,
                entry.maxTemp
            ];
        });


        const axisDims = {
            time: 0,
            windSpeed: 1,
            direction: 2,
            waveHeight: 3,
            weatherIcon: 2,
            minTemp: 3,
            maxTemp: 4
        };


        const generateWeatherIcons = function (params, api) {
            const point = api.coord([
                api.value(axisDims.time) + (3600 * 24 * 1000) / 2,
                0
            ]);

            return {
                type: "group",
                x: point[0],
                y: point[1]
            };
        };


        const chartOptions = {
            tooltip: {
                trigger: "axis",

                formatter: function (params) {
                    if (!params || !params.length) {
                        return "";
                    }

                    const item = params[0];

                    return [
                        echarts.format.formatTime(
                            "yyyy-MM-dd hh:mm",
                            item.value[axisDims.time]
                        ),
                        "Risk: " + item.value[axisDims.waveHeight] + "%"
                    ].join("<br>");
                }
            },

            grid: {
                top: 20,
                bottom: 25,
                left: 0,
                right: 50
            },

            xAxis: {
                type: "time",

                maxInterval: 3600 * 1000 * 24,

                splitLine: {
                    lineStyle: {
                        color: "#ddd"
                    }
                }
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
                            color: "#015DD5"
                        }
                    },

                    splitLine: {
                        lineStyle: {
                            color: "#ddd"
                        }
                    },

                    axisLabel: {
                        formatter: "{value}",

                        fontSize: 14,

                        color: "#333"
                    }
                },

                {
                    axisLine: {
                        show: false
                    },

                    axisTick: {
                        show: false
                    },

                    axisLabel: {
                        show: false
                    },

                    splitLine: {
                        show: false
                    }
                }
            ],

            dataZoom: [
                {
                    type: "inside",

                    xAxisIndex: 0,

                    minSpan: 5
                },

                {
                    type: "slider",

                    xAxisIndex: 0,

                    minSpan: 5,

                    bottom: 50
                }
            ],

            series: [
                {
                    type: "line",

                    yAxisIndex: 0,

                    showSymbol: false,

                    emphasis: {
                        scale: false
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
                                    color: "rgba(19,219,15,0.1)"
                                },
                                {
                                    offset: 0.2,
                                    color: "rgba(19,219,15,0.1)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(19,219,15,0)"
                                }
                            ]
                        }
                    },

                    lineStyle: {
                        color: "rgba(19,219,15,1)"
                    },

                    itemStyle: {
                        color: "rgba(19,219,15,1)"
                    },

                    encode: {
                        x: axisDims.time,
                        y: axisDims.waveHeight
                    },

                    data: chartData,

                    z: 2
                },

                {
                    type: "line",

                    yAxisIndex: 0,

                    showSymbol: false,

                    emphasis: {
                        scale: false
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
                                    color: "rgba(255,0,0,0.1)"
                                },
                                {
                                    offset: 0.4,
                                    color: "rgba(255,0,0,0)"
                                }
                            ]
                        }
                    },

                    lineStyle: {
                        color: "rgba(255,0,0,1)"
                    },

                    itemStyle: {
                        color: "rgba(255,0,0,1)"
                    },

                    encode: {
                        x: axisDims.time,
                        y: axisDims.waveHeight
                    },

                    data: chartData.map(function (entry, index) {
                        return [
                            entry[0],
                            index % 2 === 0
                                ? entry[axisDims.waveHeight]
                                : entry[axisDims.waveHeight] - 2
                        ];
                    }),

                    z: 3
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
                        }
                    },

                    yAxisIndex: 1,

                    z: 11
                }
            ]
        };


        const chartInstance = echarts.init(riskChartElement);

        chartInstance.setOption(chartOptions);


        /*
        ------------------------------------------------------------
        RISK CHART TIME BUTTONS
        ------------------------------------------------------------
        */

        function setRiskRange(buttonId) {
            const riskButtons = [
                "riskBtn1d",
                "riskBtn7d",
                "riskBtn1m",
                "riskBtn1y"
            ];

            riskButtons.forEach(function (id) {
                const button = document.getElementById(id);

                if (button) {
                    button.classList.remove("active");
                }
            });


            const selectedButton = document.getElementById(buttonId);

            if (selectedButton) {
                selectedButton.classList.add("active");
            }


            chartInstance.setOption({
                dataZoom: [
                    {
                        type: "inside",

                        start: 0,

                        end: 100
                    },

                    {
                        type: "slider",

                        start: 0,

                        end: 100,

                        bottom: 50
                    }
                ]
            });
        }


        const riskBtn1d = document.getElementById("riskBtn1d");
        const riskBtn7d = document.getElementById("riskBtn7d");
        const riskBtn1m = document.getElementById("riskBtn1m");
        const riskBtn1y = document.getElementById("riskBtn1y");


        if (riskBtn1d) {
            riskBtn1d.addEventListener("click", function () {
                setRiskRange("riskBtn1d");
            });
        }


        if (riskBtn7d) {
            riskBtn7d.addEventListener("click", function () {
                setRiskRange("riskBtn7d");
            });
        }


        if (riskBtn1m) {
            riskBtn1m.addEventListener("click", function () {
                setRiskRange("riskBtn1m");
            });
        }


        if (riskBtn1y) {
            riskBtn1y.addEventListener("click", function () {
                setRiskRange("riskBtn1y");
            });
        }


        window.addEventListener("resize", function () {
            chartInstance.resize();
        });
    }
});