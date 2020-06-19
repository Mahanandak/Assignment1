import { LightningElement, track, api } from "lwc";
import getAccountList from "@salesforce/apex/GetAccountData.getAccountList";
export default class GetAccountData extends LightningElement {
    @api accounts;
    @track error;
    @track filterAccRecords;
    sVal = "";
    rLimit = "";
    @track error;

    // update sVal var when input field value change
    updateSeachKey(event) {
            this.sVal = event.target.value;
            console.log(this.sVal);
        }
        //update var record when input field value change
    updateLimitKey(event) {
        this.rLimit = event.target.value;
    }
    filterSearchKey(event) {
        this.handleFilterData(event.target.value);
    }

    //handle search operation
    handleSearch(event) {
            //called apex Method
            console.log(this.sVal);
            if (this.sVal !== "") {
                getAccountList({
                        searchKey: this.sVal,
                        limitNumber: this.rLimit
                    })
                    .then((result) => {
                        this.accounts = result;
                        this.filterAccRecords = [...this.accounts];
                    })
                    .catch((error) => {
                        this.error = error;
                    });
            } else {
                this.error = error;
            }
        }
        //Filter Account record
    handleFilterData(filterText) {
        this.filterAccRecords = this.accounts.filter((acc) =>
            acc.Name.toLowerCase().includes(filterText.toLowerCase())
        );
    }
}