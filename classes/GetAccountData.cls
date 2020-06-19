public with sharing class GetAccountData {
   @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(string searchKey, integer limitNumber) {
       // return [SELECT Id, Name,Type,Rating,Phone FROM Account];
        System.debug('ABC' +  searchKey);
        System.debug('num' +  limitNumber);
        string sTempSearchKey = '%' + searchKey + '%';
          list<Account> accList = new list<Account>();
          System.debug('ABC' +  searchKey);
        // query contact records
        for(Account acc : [SELECT Id, Name ,Phone, Website, Industry FROM Account 
                            WHERE name LIKE : sTempSearchKey LIMIT :limitNumber ] ){
           accList.add(acc);
        }
        System.debug('ABC' +  accList);
        return accList;
    }
}