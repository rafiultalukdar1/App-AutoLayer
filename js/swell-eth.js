document.addEventListener("DOMContentLoaded", function () {
    
    /* =========================
       Tooltip
    ========================== */

    const tooltipButtons = document.querySelectorAll(".ToolTipBtn");

    tooltipButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            this.classList.toggle("active");

            const parentLi = this.closest("li");

            if (parentLi) {
                const tooltipBottom =
                    parentLi.querySelector(".tooltip-bottom");

                if (tooltipBottom) {
                    tooltipBottom.classList.toggle("active");
                }
            }
        });
    });


    /* =========================
       Chart 1 - APY Overtime
    ========================== */

    const mainChartElement = document.getElementById("main");

    if (mainChartElement && typeof echarts !== "undefined") {

        const apyData = [
            [1667845200000, 2.4],
            [1667852400000, 2.6],
            [1667859600000, 2.8],
            [1667866800000, 2.5],
            [1667874000000, 2.9],
            [1667881200000, 3.1],
            [1667888400000, 3.0],
            [1667888500000, 3.2],
            [1667888600000, 3.1],
            [1667888700000, 3.4],
            [1667888800000, 3.2],
            [1667888900000, 3.5],
            [1667889100000, 3.3],
            [1667889200000, 3.0]
        ];

        const myChart = echarts.init(mainChartElement);

        const apyOption = {

            tooltip: {
                trigger: "axis",

                formatter: function (params) {
                    if (!params.length) {
                        return "";
                    }

                    const value = params[0].value;

                    return (
                        echarts.format.formatTime(
                            "yyyy-MM-dd hh:mm",
                            value[0]
                        ) +
                        "<br>APY: " +
                        value[1] +
                        "%"
                    );
                }
            },

            grid: {
                top: 20,
                right: 50,
                bottom: 50,
                left: 45
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

            yAxis: {
                type: "value",

                min: 0,
                max: 6,

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

            dataZoom: [
                {
                    type: "inside",
                    xAxisIndex: 0,
                    start: 0,
                    end: 100
                },

                {
                    type: "slider",
                    xAxisIndex: 0,
                    start: 0,
                    end: 100,
                    bottom: 5
                }
            ],

            series: [
                {
                    name: "APY",

                    type: "line",

                    showSymbol: false,

                    smooth: true,

                    data: apyData,

                    lineStyle: {
                        color: "rgba(88,160,253,1)",
                        width: 2
                    },

                    itemStyle: {
                        color: "rgba(88,160,253,1)"
                    },

                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,

                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(88,160,253,0.3)"
                                },

                                {
                                    offset: 0.5,
                                    color: "rgba(88,160,253,0.1)"
                                },

                                {
                                    offset: 1,
                                    color: "rgba(88,160,253,0)"
                                }
                            ]
                        }
                    }
                }
            ]
        };

        myChart.setOption(apyOption);


        /* =========================
           Chart 1 Filters
        ========================== */

        const apyButtons = [
            {
                id: "apyBtn1d",
                days: 1
            },
            {
                id: "apyBtn7d",
                days: 7
            },
            {
                id: "apyBtn1m",
                days: 30
            },
            {
                id: "apyBtn1y",
                days: 365
            }
        ];

        apyButtons.forEach(function (item) {

            const button = document.getElementById(item.id);

            if (!button) {
                return;
            }

            button.addEventListener("click", function () {

                document
                    .querySelectorAll(
                        "#apyBtn1d, #apyBtn7d, #apyBtn1m, #apyBtn1y"
                    )
                    .forEach(function (btn) {
                        btn.classList.remove("active");
                    });

                this.classList.add("active");

                myChart.dispatchAction({
                    type: "dataZoom",
                    start: 0,
                    end: 100
                });
            });
        });


        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }


    /* =========================
       Chart 2 - Risk Factor
    ========================== */

    const riskChartElement =
        document.getElementById("chartUpDown");

    if (riskChartElement && typeof echarts !== "undefined") {

        const liquidityData = [
            [1667845200000, 44],
            [1667852400000, 20],
            [1667859600000, 52],
            [1667866800000, 33],
            [1667874000000, 52],
            [1667881200000, 40],
            [1667888400000, 52],
            [1667888500000, 30],
            [1667888600000, 52]
        ];

        const collateralData = [
            [1667845200000, 20],
            [1667852400000, 25],
            [1667859600000, 30],
            [1667866800000, 27],
            [1667874000000, 35],
            [1667881200000, 31],
            [1667888400000, 38],
            [1667888500000, 34],
            [1667888600000, 42]
        ];

        const chartInstance =
            echarts.init(riskChartElement);

        let currentData = liquidityData;

        const riskOption = {

            tooltip: {
                trigger: "axis",

                formatter: function (params) {

                    if (!params.length) {
                        return "";
                    }

                    const value = params[0].value;

                    return (
                        echarts.format.formatTime(
                            "yyyy-MM-dd hh:mm",
                            value[0]
                        ) +
                        "<br>Risk: " +
                        value[1] +
                        "%"
                    );
                }
            },

            grid: {
                top: 20,
                right: 50,
                bottom: 50,
                left: 45
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

            yAxis: {
                type: "value",

                min: 0,
                max: 60,

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

            dataZoom: [
                {
                    type: "inside",
                    xAxisIndex: 0,
                    start: 0,
                    end: 100
                },

                {
                    type: "slider",
                    xAxisIndex: 0,
                    start: 0,
                    end: 100,
                    bottom: 5
                }
            ],

            series: [
                {
                    name: "Liquidity",

                    type: "line",

                    showSymbol: false,

                    smooth: true,

                    data: currentData,

                    lineStyle: {
                        color: "rgba(19,219,15,1)",
                        width: 2
                    },

                    itemStyle: {
                        color: "rgba(19,219,15,1)"
                    },

                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,

                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(19,219,15,0.1)"
                                },

                                {
                                    offset: 0.5,
                                    color: "rgba(19,219,15,0.05)"
                                },

                                {
                                    offset: 1,
                                    color: "rgba(19,219,15,0)"
                                }
                            ]
                        }
                    }
                }
            ]
        };

        chartInstance.setOption(riskOption);


        /* =========================
           Liquidity / Collateral
        ========================== */

        const liquidityButton =
            document.querySelector(".risk-chart-btn .up");

        const collateralButton =
            document.querySelector(".risk-chart-btn .down");


        if (liquidityButton) {

            liquidityButton.addEventListener(
                "click",
                function () {

                    currentData = liquidityData;

                    chartInstance.setOption({
                        series: [
                            {
                                name: "Liquidity",
                                data: currentData,
                                lineStyle: {
                                    color: "rgba(19,219,15,1)"
                                },
                                itemStyle: {
                                    color: "rgba(19,219,15,1)"
                                }
                            }
                        ]
                    });

                    liquidityButton.classList.add("active");

                    if (collateralButton) {
                        collateralButton.classList.remove("active");
                    }
                }
            );
        }


        if (collateralButton) {

            collateralButton.addEventListener(
                "click",
                function () {

                    currentData = collateralData;

                    chartInstance.setOption({
                        series: [
                            {
                                name: "Collateral",
                                data: currentData,
                                lineStyle: {
                                    color: "rgba(255,0,0,1)"
                                },
                                itemStyle: {
                                    color: "rgba(255,0,0,1)"
                                }
                            }
                        ]
                    });

                    collateralButton.classList.add("active");

                    if (liquidityButton) {
                        liquidityButton.classList.remove("active");
                    }
                }
            );
        }


        /* =========================
           Chart 2 Filters
        ========================== */

        const riskButtons = [
            "riskBtn1d",
            "riskBtn7d",
            "riskBtn1m",
            "riskBtn1y"
        ];

        riskButtons.forEach(function (id) {

            const button = document.getElementById(id);

            if (!button) {
                return;
            }

            button.addEventListener(
                "click",
                function () {

                    riskButtons.forEach(function (buttonId) {

                        const btn =
                            document.getElementById(buttonId);

                        if (btn) {
                            btn.classList.remove("active");
                        }
                    });

                    this.classList.add("active");

                    chartInstance.dispatchAction({
                        type: "dataZoom",
                        start: 0,
                        end: 100
                    });
                }
            );
        });


        window.addEventListener("resize", function () {
            chartInstance.resize();
        });
    }
});