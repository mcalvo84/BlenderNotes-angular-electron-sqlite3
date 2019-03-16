// import { Pipe } from "@angular/core";
// import { PipeTransform } from "@angular/core";
// import { Observable } from "rxjs/Observable";
// import { ServiceInjector } from "../../base-app/commons";
// import { DataService } from "../services/data-service";
// import { CONFIG } from "../config";
// import { TableColumn, FileTemplateContext } from "../types";
// import { TranslationsService } from "../../base-app/shared/translations.service";
// import { InnerSubscriber } from "rxjs/InnerSubscriber";
// import { DomSanitizer } from "@angular/platform-browser";
// import { TemplateRef } from "@angular/core";
// import { WidgetStructure } from "../widgets/pwidget-with-ds-selectiem";
// import { ObjectUtils } from "primeng/components/utils/objectutils";
// import { MultiSelectReplies } from "../widgets/multi-select/multi-select";
// import { BaseClassWithSubscriptions } from "../../base-app/base.subscriptions";
// import { BaseAppService } from "../../base-app/base.app.service";
// import { DorsaleHttp } from "../../base-app/shared/http";
// import { SecurityUserDTO, LdapUserDTO, QuestionDTO, VersionDTO, DocumentDTO } from "../dtos";
// import { UserService } from "../services/user-service";
// import { DorsaleTranslate } from "../../base-app/shared/base-app-pipes";
// import { CONSTANTS } from "../constants";
// import { DocumentsService, WidgetDocument } from "../services/documents-service";
// import { UpperCasePipe } from "@angular/common";
// import { Subscription } from "rxjs/Subscription";

// @Pipe({name: 'icon'})
// export class IconPipe implements PipeTransform{
//     transform(mimeType: string): string {
//         if(!mimeType) return '';
//         return mimeType.match(/word/gi) ? '-word-o' :
//             (mimeType == 'application/pdf' ? '-pdf-o' :
//              (mimeType.match(/ms-excel|openxmlformats|spreadsheetml/gi) ? '-excel-o' :
//               (mimeType.match(/image/gi) ? '-image-o' : '')));
//     }
// }

// @Pipe({name: 'uploadVersion'})
// export class VersionPipe implements PipeTransform{
//     transform(doc: DocumentDTO): string{
//         return doc.command && doc.command.fileToUpload ? '' : `V${doc.command.originalVersion.chronologicalOrder}`;
//     }
// }

// @Pipe({name: 'hasVersions'})
// export class HasVersionsPipe implements PipeTransform {
//     transform(file: WidgetDocument): boolean {
//         return Array.isArray(file.doc.versions) && file.doc.versions.length > 1;
//     }
// }

// @Pipe({name: 'docLanguageDisabled'})
// export class DocLanguageDisabledPipe implements PipeTransform {
//     protected service: DocumentsService;
//     constructor(){
//         this.service = ServiceInjector.injector.get(DocumentsService);
//     }
//     transform(file: WidgetDocument, isReadOnly: boolean, type?: Function): boolean {
//         if (isReadOnly){
//             return true;
//         }

//         if (!this.service.isMainDocument(file)){
//             return false;
//         }

//         // If the main file can be multiple, then it means that it depends also on the languages,
//         // so the language is always disabled. If it's not multiple, then it means that the fact
//         // that is main does not depend on the language, so the language can be changed.
//         return file.mapper.isMultiple;
//     }
// }

// @Pipe({name: 'docCanBeDeleted'})
// export class DocCanBeDeletedPipe extends DocLanguageDisabledPipe implements PipeTransform {
//     transform(file: WidgetDocument): boolean{
//         return !this.service.isMainDocument(file);
//     }
// }

// @Pipe({name: 'docTypeDisabled'})
// export class DocTypeDisabledPipe extends DocLanguageDisabledPipe implements PipeTransform {
//     transform(file: WidgetDocument, isReadOnly: boolean, type: Function): boolean {
//         // Check if we only have one type, the it's always disabled
//         let mapper = this.service.getComposer(type);
//         if (mapper.mappers.length == 1){
//             return true;
//         }
//         return isReadOnly || (file.doc.command.originalVersion && file.doc.command.originalVersion.id && file.mapper.typeIdentifier) ? true : false;
//     }
// }

// @Pipe({name: 'documentTitle'})
// export class DocumentTitlePipe implements PipeTransform {
//     private _pipe: VersionPipe;
//     private _ucasePipe: UpperCasePipe;
//     constructor(){
//         this._pipe = new VersionPipe();
//         this._ucasePipe = new UpperCasePipe();
//     }
//     transform(doc: DocumentDTO): string {
//         let lang = doc.command.language ? `_${this._ucasePipe.transform(doc.command.language.code)}` : '';
//         let title = doc.title || doc.command.tmpFileOriginalName || doc.command.originalVersion.documentTitle || '';
//         return `${title}${lang}_${this._pipe.transform(doc)}`;
//     }
// }

// /**
//  * Pipe to be used instead of the angular date pipe.
//  * You should use this, since this will use the format from the
//  * {@link CONFIG}. Please note that using the angular date pipe,
//  * you will have to define the format yourself.
//  */
// @Pipe({name: 'repliesDate'})
// export class DatePipe implements PipeTransform {
//     transform(date: Date | string){
//         if (typeof(date) == 'string'){
//             return date;
//         }
//         if (!date){
//             return '';
//         }
//         let service = ServiceInjector.injector.get(DataService);
//         return service.formatDate(date, CONFIG.DATE_FORMAT);
//     }
// }

// @Pipe({name: 'tableHeader'})
// export class TableHeaderPipe extends BaseClassWithSubscriptions implements PipeTransform{
//     transform(col: TableColumn): Observable<String>{
//         return Observable.create((observer: InnerSubscriber<any, any>) => {
//             if (col.translatable){
//                 let service: TranslationsService = ServiceInjector.injector.get(TranslationsService);
//                 this.connect(service.languageChanged, () => observer.next(service.translate(col.header)));

//                 return ;
//             }

//             observer.next(col.header);
//             observer.complete();
//         });
//     }
// }

// @Pipe({name: 'tableTemplate'})
// export class TableTemplatePipe implements PipeTransform {
//     transform(row: Object, col: TableColumn, defaultTpl: TemplateRef<any>): TemplateRef<any>{
//         let result: TemplateRef<any> = (col.template && col.template(row)) || null;
//         return result instanceof TemplateRef ? result : defaultTpl;
//     }
// }

// @Pipe({name: 'tableValue'})
// export class TableValuePipe implements PipeTransform{
//     transform(row: Object, col: TableColumn, templateValueFunction?: Function): string {
//         let result = col.template ? col.template(row) : row[col.field];
//         return result instanceof TemplateRef ? (templateValueFunction ? templateValueFunction(row) : '') : result;
//     }
// }

// @Pipe({name: 'keepHtml'})
// export class KeepHtml implements PipeTransform {
//     private service: DomSanitizer;

//     constructor (){
//         this.service = ServiceInjector.injector.get(DomSanitizer);
//     }

//     transform(value: string): any {
//         return this.service.bypassSecurityTrustHtml(value);
//     }
// }

// @Pipe({name: 'tableColumnClass'})
// export class TableColumnClassPipe implements PipeTransform {
//     transform(row: Object, col: TableColumn): string {
//         if (!col.cssClass){
//             return '';
//         }

//         return typeof(col.cssClass) == 'string' ? col.cssClass : col.cssClass(row);
//     }
// }

// @Pipe({name: 'dropdownValue'})
// export class DropDownValuePipe implements PipeTransform {
//     transform(row: Object, structure: WidgetStructure): string {
//         return (row && row[structure.value]) || '';
//     }
// }

// @Pipe({name: 'dropdownModel'})
// export class DropDownModelPipe implements PipeTransform {
//     transform(model: string, rows: Array<Object>): Object {
//         if (!rows){
//             return model;
//         }
//         let value = rows.find(v => v['value'] == model);
//         return (value && value['row']) || null;
//     }
// }

// @Pipe({name: 'dropdownReadOnly'})
// export class DropDownReadOnlyPipe implements PipeTransform {
//     transform(row: Object, path: string): string {
//         if (BaseAppService.getType(row) != 'object'){
//             return <any>row;

//         }
//         return ObjectUtils['resolveFieldData'](row, path) || '';
//     }
// }

// @Pipe({name: 'isQuestionType'})
// export class QuestionTypeAttribute implements PipeTransform {
//     transform(type: string, typeCompare: Array<string>, isNot: boolean): boolean {
//         let idx = typeCompare.indexOf(type);
//         return isNot ? idx != -1 : idx == -1;
//     }
// }

// @Pipe({name: 'isSuspended'})
// export class IsSuspended implements PipeTransform {
//     transform(row: any): string {
//         let result = [71, 72, 73].indexOf(row.lastProjectStateId) != -1 && row.isMaxProcedureLogId && row.procedureLogTypeCode == 'procedureLogType.suspendWrittenProcedure' ;
//         return `replies.general.${result ? 'yes': 'no'}`;
//     }
// }
// @Pipe({name: 'ofQuestionType'})
// export class QuestionTypeValue implements PipeTransform {
//     private url: string = 'rest/data/questionStatuses/';

//     transform(type: string): string {
//         let defaultType = 'WRITTEN_QUESTION';

//         return this.url + (type || defaultType);
//     }
// }

// @Pipe({name: 'multiselectReadonly'})
// export class MultiselectReadonlyPipe extends BaseClassWithSubscriptions implements PipeTransform {
//     private _ts: TranslationsService;

//     constructor(){
//         super();
//         this._ts = ServiceInjector.injector.get(TranslationsService);
//     }

//     private _getValue(widget: MultiSelectReplies): string {
//         return widget.model.map(v => widget.isTranslatable ? this._ts.translate(v[widget.structure.label]) : v[widget.structure.label]).join(', ');
//     }

//     transform(model: Array<Object>, widget: MultiSelectReplies): Observable<string> {
//         return Observable.create(observer => {
//             if (!widget.structure || model.length == 0){
//                 observer.next('');
//                 observer.complete();
//                 return ;
//             }

//             if (widget.isTranslatable){
//                 this.connect(this._ts.languageChanged, () => observer.next(this._getValue(widget)));
//             }
//             else {
//                 observer.next(widget.areValuesPrimitives ? model.join(', ') : this._getValue(widget));
//                 observer.complete();
//             }
//         })
//     }
// }

// /**
//  * Pipe used for concluding if a certain list
//  * should have server side filters or not. So far, the transmitted
//  * list has mandatory server side filters.
//  */
// @Pipe({name: 'hasServerFilters'})
// export class HasServerFilters implements PipeTransform {
//     transform(list: string): boolean {
//         return ['transmitted'].indexOf(list) != -1;
//     }
// }

// @Pipe({name: 'shortQuestionType'})
// export class ShortQuestionTypePipe implements PipeTransform {
//     private static questionTypeSwitch: Map<string,string> = new Map<string, string> ([
//         ['WRITTEN_QUESTION', 'E'],
//         ['PRIORITY_QUESTION', 'P'],
//         ['ORAL_QUESTION', 'O'],
//         ['H_QUESTION', 'H'],
//         ['OMB_QUESTION', 'OMB'],
//     ]);

//     transform(longType: string): string {
//         return ShortQuestionTypePipe.questionTypeSwitch.get(longType);
//     }
// }

// @Pipe({name: 'statusLabel'})
// export class StatusLabelPipe implements PipeTransform {
//     private http: DorsaleHttp;

//     constructor() {
//         this.http = ServiceInjector.injector.get(DorsaleHttp);
//     }

//     transform(code: string, qType: string): Observable<string> {
//         let url = (new QuestionTypeValue()).transform(qType);
//         return this.http.doRequest({url: url, staticCache: true, method: 'get'}).map(res => {
//             let el = (<Array<any>>res.json()).find(e => e.name == code);
//             return (el && el.value) || null;
//         });
//     }
// }

// /**
//  * Pipe used to transform from a
//  * {@link SecurityUserDTO} to a {@link LdapUserDTO}
//  */
// @Pipe({name: 'toLdapUser'})
// export class ToLdapUserDTO implements PipeTransform{
//     transform(user: SecurityUserDTO): LdapUserDTO {
//         return UserService.entity2Ldap(user);
//     }
// }

// @Pipe({name: 'usersListCommandsIcon'})
// export class UsersListCommandIcon implements PipeTransform {
//     transform(active, which: 'O' | 'P'): string {
//         return active ? 'lock' : 'unlock';
//     }
// }

// /**
//  * Pipe used to translate if the identifier is in form of a label
//  * A check with a regexp is done and if the label is not of the type
//  * <small-caps-multiple-times>. etc. and finishes in a small cap, then
//  * the item is not translated.
//  */
// @Pipe({name: 'translateIfLabel'})
// export class TranslateIfLabel extends DorsaleTranslate{
//     transform(value: string, doTranslate?: boolean, args?: Array<any>): Observable<string> {
//         let _doTranslate = doTranslate !== false && value && value.match(/^[a-z][a-zA-Z]*(\.[a-zA-Z]+)*[a-z]$/g) ? true : false;
//         return super.transform(value, _doTranslate, args);
//     }
// }

// @Pipe({name: 'styleHeightPx'})
// export class StyleHeightPxPipe implements PipeTransform {
//     transform(value): string {
//         return `${value}px`;
//     }
// }

// @Pipe({name: 'dossierStatus'})
// export class DossierStatusPipe implements PipeTransform {
//     private static workflowLabels: Map<number, string> = new Map<number, string>([
//         [CONSTANTS.WorkflowQuestion.STEP_UNOFFICIAL_QUESTION, 'workflow.wq.step.unofficialQuestion'],
//         [CONSTANTS.WorkflowQuestion.STEP_OFFICIAL_QUESTION, 'workflow.wq.step.officialQuestion'],
//         [CONSTANTS.WorkflowQuestion.STEP_OFFICIAL_ATTRIBUTION, 'workflow.wq.step.officialAttribution'],
//         [CONSTANTS.WorkflowQuestion.STEP_ONGOING_PROJECT, 'workflow.wq.step.ongoingProject'],
//         [CONSTANTS.WorkflowQuestion.STEP_CLOSED, 'workflow.wq.step.abandoned'],
//         [CONSTANTS.WorkflowQuestion.STEP_ARCHIVED, 'workflow.wq.step.abandoned'],
//     ]);

//     transform(dossier: QuestionDTO): string {
//         if (dossier.workflowStep != CONSTANTS.WorkflowQuestion.STEP_ONGOING_PROJECT){
//             return DossierStatusPipe.workflowLabels.get(dossier.workflowStep);
//         }

//         // TODO: Implement the logic to find out if a reply has been sent
//         // or not here.
//         return DossierStatusPipe.workflowLabels.get(dossier.workflowStep);
//     }
// }

// @Pipe({name: 'similarQuestions'})
// export class SimilarQuestionsPipe implements PipeTransform {
//     transform(questions: Array<QuestionDTO>, checkIdentical: boolean): Array<QuestionDTO> {
//         return (questions || []).filter(q => checkIdentical ? q.masterQuestionIdentical == true : q.masterQuestionIdentical == false);
//     }
// }

// /**
//  * There are some enums in the backed which have a i18Code property.
//  * The getName() and getValue() for those will always return the identifier,
//  * but then displayng them we need the i18 code, not the identifiant. One example
//  * is {@link ProcedureLogType}. In this case, you need to add that enum into
//  * {@link CONFIG}`::I18_CODES` property and then display them through this pips.
//  */
// @Pipe({name: 'i18Code'})
// export class i18CodePipe implements PipeTransform {
//     /**
//      * @param dto The object which contains the property of an i18Code enum type
//      * @param property The name of the property
//      */
//     transform(dto: Object, property: string, type: string): string {
//         if (!dto || !dto[property] || !type){
//             return '';
//         }

//         return CONFIG.I18_CODES.get(type).get(dto[property]);
//     }
// }

// @Pipe({name: 'fileUrl'})
// export class fileUrlPipe implements PipeTransform {
//     transform(file: VersionDTO): string {
//         return `/replies/downloadBinary.do?versionId=${file.id}`;
//     }
// }

// @Pipe({name: 'isTemplate'})
// export class IsTemplatePipe implements PipeTransform {
//     transform(obj): boolean {
//         return obj instanceof TemplateRef;
//     }
// }

// @Pipe({name: 'hideLabel'})
// export class HideLabelPipe implements PipeTransform {
//     transform(label: string, styleClass: string): string {
//         if (label !== ''){
//             return styleClass;
//         }
//         return styleClass + ' hide-label';
//     }
// }

// @Pipe({name: 'checkboxWithRadioLabel'})
// export class CheckboxWithRadioLabelPipe implements PipeTransform {
//     transform(model): string {
//         return (model && model.name) || '';
//     }
// }
