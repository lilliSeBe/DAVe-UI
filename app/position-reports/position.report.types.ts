export interface PositionReportServerData {
    _id?: {
        clearer: string;
        member: string;
        account: string;
        clss: string;
        symbol: string;
        putCall: string;
        strikePrice: string;
        optAttribute: string;
        maturityMonthYear: string
    };
    id: {
        $oid: string
    };
    clearer: string;
    member: string;
    account: string;
    clss: string;
    reqId: any;
    rptId: string;
    bizDt: string;
    lastReportRequested: any;
    sesId: any;
    symbol: string;
    putCall: string;
    maturityMonthYear: string;
    strikePrice: string;
    optAttribute: string;
    crossMarginLongQty: number;
    crossMarginShortQty: number;
    optionExcerciseQty: number;
    optionAssignmentQty: number;
    allocationTradeQty: number;
    deliveryNoticeQty: number;
    clearingCcy: string;
    mVar: number;
    compVar: number;
    compCorrelationBreak: number;
    compCompressionError: number;
    compLiquidityAddOn: number;
    compLongOptionCredit: number;
    productCcy: string;
    variationMarginPremiumPayment: number;
    premiumMargin: number;
    delta: number;
    gamma: number;
    vega: number;
    rho: number;
    theta: number;
    underlying: string;
    received: string;
}

export interface PositionReportBase {
    uid: string;
    clearer: string;
    member: string;
    account: string;
    symbol: string;
    putCall: string;
    maturityMonthYear: string;
}

export interface PositionReportData extends PositionReportBase {
    class: string;
    strikePrice?: number;
    optAttribute: string;
    compLiquidityAddOn: number;
    delta: number;
    netLS?: number;
    netEA?: number;
    bizDt: string;
    crossMarginLongQty: number;
    crossMarginShortQty: number;
    optionExcerciseQty: number;
    optionAssignmentQty: number;
    allocationTradeQty: number;
    deliveryNoticeQty: number;
    clearingCcy: string;
    mVar: number;
    compVar: number;
    compCorrelationBreak: number;
    compCompressionError: number;
    compLongOptionCredit: number;
    productCcy: string;
    variationMarginPremiumPayment: number;
    premiumMargin: number;
    gamma: number;
    vega: number;
    rho: number;
    theta: number;
    underlying: string;
    received: Date;
}

export type SelectValues = {
    record?: PositionReportBubble,
    subRecords: PositionReportChartDataSelect
}

export class PositionReportChartDataSelect {

    private options: {
        [key: string]: SelectValues
    } = {};

    constructor(public key?: string) {
    }

    public getOptions(): PositionReportBubble[] {
        return Object.keys(this.options).map((key: string) => {
            return this.options[key].record;
        });
    }

    public get(key: string): SelectValues {
        return this.options[key];
    }

    public create(key: string): SelectValues {
        return this.options[key] = {
            subRecords: new PositionReportChartDataSelect(key)
        };
    }
}

export interface PositionReportBubble {
    key: string;
    memberKey: string;
    hAxisKey: string;
    clearer: string;
    member: string;
    account: string;
    symbol: string;
    putCall: string;
    maturityMonthYear: string;
    underlying: string;
    radius: number;
}

export interface PositionReportChartData {
    bubbles: PositionReportBubble[];
    selection: PositionReportChartDataSelect;
    memberSelection: PositionReportBubble;
    accountSelection: PositionReportBubble;
}