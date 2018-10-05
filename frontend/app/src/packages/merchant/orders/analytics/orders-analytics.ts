/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Platform, ModalController, App, NavController } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsAuthService } from "@services/auth.service";
import { CurrencyPipe } from "@angular/common";

import chartJs from 'chart.js';

@IonicPage({
    segment: "order-analytics",
    priority: "high"
})
@Component({
    selector: "page-orders-analytics",
    templateUrl: "orders-analytics.html"
})

export class OrdersAnalyticsPage {

    @ViewChild("monthChart") monthChart;
    @ViewChild("weekChart") weekChart;

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    weekOrders: Array<any>;
    weekTotal: number;
    monthOrders: Array<any>;
    monthTotal: number;
    token: string;
    isMerchant: any;
    currency: CurrencyPipe;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app as any);
        this.navigationService.setNavCtrl(this.navCtrl as any);
        this.translations = this.locales.load();
        this.currency = new CurrencyPipe('pt-BR');
    }

    ionViewWillEnter() {
        this.init();
    }

    async init() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            await this.getMonthOrders();
            await this.getWeekOrders();
        }
    }

    async getMonthOrders() {
        try {
            /* let orders = (await Backend.getOrdersByDatesAndUserId({ xAccessToken: this.token })).data; */
            this.monthTotal = 0;
            this.monthOrders = [{
                date: "01-08",
                count: 72
            },
            {
                date: "08-16",
                count: 85
            },
            {
                date: "16-22",
                count: 78
            },
            {
                date: "22-30",
                count: 87
            }];
            this.monthOrders.map((date) => { this.monthTotal += date.count });
            await this.generateOrdersChart(this.monthChart.nativeElement, this.monthOrders);
            this.changeDetector.detectChanges();
        } catch (e) {
            console.log(e);
        }
    }

    async getWeekOrders() {
        try {
            /* let orders = (await Backend.getOrdersByDatesAndUserId({ xAccessToken: this.token })).data; */
            this.weekTotal = 0;
            this.weekOrders = [{
                date: "09/07",
                count: 8
            },
            {
                date: "10/07",
                count: 10
            },
            {
                date: "11/07",
                count: 12
            },
            {
                date: "12/07",
                count: 10
            },
            {
                date: "13/07",
                count: 12
            },
            {
                date: "14/07",
                count: 15
            },
            {
                date: "15/07",
                count: 20
            }];
            this.weekOrders.map((date) => { this.weekTotal += date.count });
            await this.generateOrdersChart(this.weekChart.nativeElement, this.weekOrders);
            this.changeDetector.detectChanges();
        } catch (e) {
            console.log(e);
        }
    }

    generateOrdersChart(canvas, orders) {
        if (!orders) return;
        let data = {
            labels: orders.map((x) => x.date),
            datasets: [{
                label: 'Número de vendas',
                fill: true,
                lineTension: 0.4,
                backgroundColor: 'rgba(51, 129, 246,0.8)',
                borderColor: 'rgba(51, 129, 246,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(51, 129, 246,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(51, 129, 246,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false,
                data: orders.map((x) => x.count)
            }]
        };

        return this.getChart(canvas, 'line', data);
    }


    getChart(context, chartType, data, options?) {
        options = options || {
            legend: {
                display: true,
                position: "bottom",
                fullWidth: true,
                reverse: false,
                labels: {
                    usePointStyle: true
                }
            }
        };
        console.log(options);
        return new chartJs(context, {
            data,
            options,
            type: chartType,
        });
    }

}
