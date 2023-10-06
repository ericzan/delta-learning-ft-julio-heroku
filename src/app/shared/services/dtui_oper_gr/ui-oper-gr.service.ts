import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PackageWordDto } from './dto/package-word-dto';

@Injectable({
  providedIn: 'root'
})
export class UiOperGrService {

  constructor(private http: HttpService) { }

  getCategories(){
    return this.http.get<any>('dt/ui_oper_gr/get_/categories')
  }
  getDashboard(){
    return this.http.get<any>('dt/ui_oper_gr/get_/dashboard/')
  }
  getInfoUser(){
    return this.http.get<any>('dt/ui_oper_gr/get_/config_uid/')
  }
  getListPackageOfSubCategory(subCatId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_packagelist/${subCatId}`)
  }
  getSubCategory(subCatId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/cat_subc/${subCatId}`)
  }
  getListPackageOfSubCategoryHistory(subCatId: string, page: number, ishow : number){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_packagehistorylist/?idSCat=${subCatId}&ipage=${page}&ishow=${ishow}`)
  }
  setArchivePackage(packageId: string){
    return this.http.post<any>( `dt/ui_oper_lv/pst_/packagearchive/?package=${packageId}
    `,{})
  }
  setNamePackage(packageId: string, label: string){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/packagename/`,{
      package: packageId,
      label,
    })
  }
  getPackage(pkgnameId: string): Observable<PackageWordDto>{
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_words/${pkgnameId}`)
  }

  getSinglePackage(pkgnameId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_package_st/${pkgnameId}`)
  }
  getPackageStep4(body: {
    idScat: number,
    package: string,
    capacity: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words4/`,body)
  }
  getUrlAudio(body: {
    word: string,
    idWord: string
  }){
    return environment.apiUrl + `/dt/ui_oper_gr/get_/user_word_pronunciation/?word=${body.word}&idWord=${body.idWord}`
  }
  getUrlAudio_2(body: {
    word: string,
    idWord: string
  }){
    return environment.apiUrl + `/dt/ui_oper_gr/get_/word_sound_element/?word=${body.word}&idWord=${body.idWord}`
  }
  getPackageStep5(body: {
    idScat: number,
    package: string,
    capacity: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words5/`,body)
  }
  createPackage(body: {
    idScat: number,
    package: string,
    capacity?: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words/`,body)
  }
  saveLevel(body: {
    package: string,
    updtime: string,//"2023-06-08T04:21:39.250047",
    level: 'lvl_10_01' | 'lvl_20_01' | 'lvl_30_01' | 'lvl_40_01' | 'lvl_50_01',
    clicksQty: number,
    cardsQty: number
  }){
    return this.http.post<any>( `dt/ui_oper_lv/level/`,body)
  }
  changePassword(body: {
    oldkeypass: string,
    newkeypass: string
  }){
    return this.http.post<any>( `dt/auth/change_pass/`,body)
  }

  getGamesAA(body: {
    orgId: string,
    limit: number,
    subcat: number,
    kogame:string
    adj: boolean,
    verb: boolean,
    pt_verb: boolean,
    noun: boolean,
    adv : boolean,
    prep : boolean
  }){
    return this.http.post<any>( `dt/ui_oper_gr/gamesAA/`,body )
  }



  getGamesAA_Archive(body: {
    orgId: string,
    subcat: number,
    words: string,
    average: string,
    kogame: string,
  }){
    return this.http.post<any>( `dt/ui_oper_gr/gamesAA_archive/`,body )
  }

  getGamesAA_Archive_2(body: {
    orgId: string,
    subcat: number,
    words: Array<string>,
     grades: Array<number>,
    average: string,
    kogame: string,
  }){
    return this.http.post<any>( `dt/ui_oper_gr/gamesAA_archive/`,body )
  }

  getleval(body: {
  orgId: string,
  starton: number,
  limit: number,
  word: string,
  setlevel: boolean,
}){
  return this.http.post<any>( `dt/ui_oper_gr/leval/`,body )
}




getGamesAAPuzzleWords(body: {
  org: string,
  ulevel: string,
  kog: string,
  hms: number,
  words:string,
  avg: number,
  setlevel:boolean,
}){
  return this.http.post<any>( `dt/ui_oper_gr/gamesAA_puzzlewords/`,body )
}

getGamesAAPuzzleWords_2(body: {
  org: string,
  ulevel: string,
  kog: string,
  hms: number,
  words : Array<string>,
  grades: Array<number>,
  avg: number,
  setlevel:boolean,
}){
  return this.http.post<any>( `dt/ui_oper_gr/gamesAA_puzzlewords/`,body )
}

getRecLinks( ){
  return this.http.get<any>( `dt/ui_oper_gr/reclinks/`  )
}
setUserReg(body: {
  userId: string,
  orgId: string,
  name: string,
  email: string,
  email_alt: string,
  native_lang: string,
  selected_lang: string,
  country_birth: string,
  country_res: string,
  kolic: string
}){
  return this.http.post<any>( `dt/auth/userreg/`,body )
}
getCountries( ){
  return this.http.get<any>( `dt/auth/get_countries/`  )
}
getLanguages( ){
  return this.http.get<any>( `dt/auth/get_langs/`  )
}
getTDT( ){
  return this.http.get<any>( `dt/auth/tdt/`  )
}

setAskForSupportoth(body: {
  classification: string,
  subject: string,
  longdescription: string
}){
  return this.http.post<any>( `dt/ui_oper_gr/askforsupportoth/`,body )
}

getAvailableProducts( ){
  return this.http.get<any>( `dt/auth/s_available_products/`  )
}

}
