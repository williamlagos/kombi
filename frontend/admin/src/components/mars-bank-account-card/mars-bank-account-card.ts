/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Bank account card component.
 */

import { ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'mars-bank-account-card',
    templateUrl: 'mars-bank-account-card.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarsBankAccountCardComponent {
    @Input("account") account: Array<any>;
    @ViewChild("accountForm") private form: NgForm;

    private banks = [{ "label": "BANCO ABN AMRO REAL S.A. (REAL)", "value": "356" }, { "label": "BANCO ACOMERCIAL E DE INVESTIMENTO SUDAMERIS S.A. (SUDAMERIS)", "value": "215" }, { "label": "BANCO ALFA S.A (ALFA)", "value": "025" }, { "label": "BANCO BBM S.A (BBM)", "value": "107" }, { "label": "BANCO BMG S.A. (BMG)", "value": "318" }, { "label": "BANCO BRADESCO S.A. (BRADESCO)", "value": "237" }, { "label": "BANCO CACIQUE S. A. (CACIQUE)", "value": "263" }, { "label": "BANCO CITIBANK S.A.", "value": "745" }, { "label": "BANCO COOPERATIVO DO BRASIL S.A. - (BANCOOB)", "value": "756" }, { "label": "BANCO COOPERATIVO SICREDI S.A. (SICREDI)", "value": "748" }, { "label": "BANCO CRUZEIRO DO SUL S.A. (CRUZEIRO DO SUL)", "value": "229" }, { "label": "BANCO DA AMAZONIA S.A. (BANCO DA AMAZÔNIA (BASA))", "value": "003" }, { "label": "BANCO DE BRASÍLIA S.A. (BRB)", "value": "070" }, { "label": "BANCO DO BRASIL S.A. (BANCO DO BRASIL)", "value": "001" }, { "label": "BANCO DO ESTADO DE SANTA CATARINA S.A.", "value": "027" }, { "label": "BANCO DO ESTADO DE SERGIPE S.A (BANESE)", "value": "047" }, { "label": "BANCO DO ESTADO DO PARÁ S/A. (BANPARÁ)", "value": "037" }, { "label": "BANCO DO ESTADO DO RIO GRANDE DO SUL S.A. (BANRISUL)", "value": "041" }, { "label": "BANCO DO NORDESTE DO BRASIL S.A (BANCO DO NORDESTE (BNB) )", "value": "004" }, { "label": "BANCO FININVEST S.A. (FININVEST)", "value": "252" }, { "label": "BANCO IBI S.A - BANCO MULTIPLO (BANCO IBI)", "value": "063" }, { "label": "BANCO INTERMEDIUM S.A.", "value": "077" }, { "label": "BANCO ITAU S.A. (ITAÚ)", "value": "341" }, { "label": "BANCO ITAUBANK S.A.", "value": "479" }, { "label": "BANCO MERCANTIL DO BRASIL S.A. (MERCANTIL DO BRASIL)", "value": "389" }, { "label": "BANCO NOSSA CAIXA S.A (NOSSA CAIXA)", "value": "151" }, { "label": "BANCO ORIGINAL", "value": "212" }, { "label": "BANCO PANAMERICANO S.A. (PANAMERICANO)", "value": "623" }, { "label": "BANCO RENDIMENTO S.A. (BANCO RENDIMENTO)", "value": "633" }, { "label": "BANCO SAFRA S.A. (SAFRA)", "value": "422" }, { "label": "BANCO SANTANDER S.A. (SANTANDER BANESPA)", "value": "033" }, { "label": "BANCO SIMPLES S.A. (BANCO SIMPLES)", "value": "749" }, { "label": "BANCO UBS PACTUAL S.A.", "value": "208" }, { "label": "BANCO UNICRED", "value": "136" }, { "label": "BANCO VOTORANTIM S.A (VOTORANTIM)", "value": "655" }, { "label": "BANESTES S.A BANCO DO ESTADO DO ESPIRITO SANTO (BANESTES)", "value": "021" }, { "label": "BANIF - BANCO INTERNACIONAL DO FUNCHAL (BRASIL), S.A. (BANIF)", "value": "719" }, { "label": "BPN BRASIL BANCO MÚLTIPLO S.A. (BPN)", "value": "069" }, { "label": "CAIXA ECONOMICA FEDERAL (CAIXA ECONÔMICA FEDERAL)", "value": "104" }, { "label": "CECRED-COOPERATIVA CENTRAL DE CREDITO URBANO", "value": "085" }, { "label": "CONFEDERAÇÂO NACIONAL DAS COOPERATIVAS CENTRAIS UNICREDS", "value": "136" }, { "label": "HSBC BANK BRASIL S.A.BANCO MULTIPLO (HSBC)", "value": "399" }, { "label": "LEMON BANK BANCO MÚLTIPLO S..A (LEMON BANK)", "value": "065" }, { "label": "UNIBANCO UNIAO DE BANCOS BRASILEIROS S.A. (UNIBANCO)", "value": "409" }];
    constructor(private changeDetector: ChangeDetectorRef) { }

    ngOnInit() { }
}
