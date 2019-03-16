// import { Pipe, PipeTransform } from "@angular/core";
// import { Observable } from "rxjs/Observable";
// import { InnerSubscriber } from "rxjs/InnerSubscriber";

// @Pipe({
//     name: 'appButtonStyle'
// })
// export class StyleClassPipe implements PipeTransform {
//     transform(button): string {
//         return button.type === 'action' ? 'ux-button-secondary' : 'ux-button-primary';
//     }
// }

// @Pipe({name: 'buttonsFilter'})
// export class FilterButtonsPipe implements PipeTransform {
//     transform(buttons: Array<DossierEditButton>, type: ButtonType): Array<DossierEditButton>{
//         return (buttons || []).filter(b => b.type == type);
//     }
// }

// @Pipe({name: 'getLabel'})
// export class DetailsLabelPipe implements PipeTransform{
//     private static labelsMap = {
//         dossier: {
//             panelTitle: {omb: 'questionOMB.tab.title', pq: 'question.tab.title'},
//             editButton: {omb: 'global.lbl.edit.dossier', pq: 'global.lbl.edit.question'},
//         },
//         reply: {
//             panelTitle: {omb: 'replyProject.tab.title', pq: 'replyProject.tab.title.pq'},
//             editButton: {omb: 'global.lbl.edit.request.omb', pq: 'global.lbl.edit.request'},
//         }
//     }
//     transform(q, type: 'panelTitle' | 'editButton', formType: 'dossier' | 'reply'): string {
//         if (Object.keys(q).length == 0){
//             return '';
//         }
//         let s: DossiersService = ServiceInjector.injector.get(DossiersService);
//         if (!s.isPqQuestion(q) && !s.isOmbQuestion(q)){
//             return '';
//         }

//         let which = s.isOmbQuestion(q) ? 'omb' : 'pq';
//         return DetailsLabelPipe.labelsMap[formType][type][which];
//     }
// }

// @Pipe({name: 'dossiersLabelPipe'})
// export class LabelPipe implements PipeTransform {
//     private tService: TranslationsService;
//     constructor(){
//         this.tService = ServiceInjector.injector.get(TranslationsService);
//     }
//     transform(row: Object): Observable<String>{
//         return Observable.create((observer: InnerSubscriber<any, any>) => {
//             this.tService.languageChanged.subscribe(() =>
//                 observer.next(this.tService.translate(row['masterQuestionIdentical'] ? 'replies.general.yes' : 'replies.general.no')));
//         });
//     }
// }

// @Pipe({name: 'questionIdentifier'})
// export class QuestionIdentifierPipe implements PipeTransform {
//     public transform(model: DossierFormType): Observable<string> {
//         if (!model.questionIsMaster && !model.questionIsJoined){
//             return Observable.create(observer => {
//                 observer.next(model.question.identifier);
//                 observer.complete();
//             });
//         }

//         let pipe: DorsaleTranslate = new DorsaleTranslate();
//         let lbl: string = `question${(<any>model.question).ombudsmanQuestion ? 'OMB' : ''}.${model.questionIsMaster ? 'master' : 'joined'}.label`;

//         return pipe.transform(lbl, true, [model.question.identifier]);
//     }
// }

// @Pipe({name: 'showWidgetLabel'})
// export class ShowWidgetLabelPipe implements PipeTransform {
//     private static _labelsMap: Map<DossierHeaderShowType, string>
//         = new Map<DossierHeaderShowType, string>([['collapsed', 'global.lbl.show.more'], ['expanded', 'global.lbl.show.less']]);

//     transform(state: DossierHeaderShowType): string {
//         return ShowWidgetLabelPipe._labelsMap.get(state);
//     }
// }

// @Pipe({name: 'translationRequestFiles'})
// export class TranslationRequestFilesPipe implements PipeTransform {
//     transform(model: Array<TranslationRequestFieldDTO>): Array<DocumentCommandDTO> {
//         return (model && model.map(f => f.document.command)) || [];
//     }
// }

// @Pipe({name: 'filesList'})
// export class FilesListPipe implements PipeTransform {
//     transform(dto, ...fields): Array<DocumentCommandDTO>{
//         if (!dto || Object.keys(dto).length == 0){
//             return [];
//         }
//         let result: Array<DocumentDTO> = [];
//         fields.forEach(f => result = result.concat(Array.isArray(dto[f]) ? dto[f] : [dto[f]]));

//         return result.map(d => d.command);
//     }
// }

// @Pipe({name: 'filesListEdit'})
// export class FilesListEditPipe implements PipeTransform {
//     private _pipe: FilesListPipe = new FilesListPipe();
//     private static _documentsList(model: QuestionDTO | ReplyProjectDTO, prop: string): Array<DocumentDTO>{
//         return <Array<DocumentDTO>>((<any>model)[prop]);
//     }
//     transform(model: DossierFormType, type: 'details' | 'reply'): Array<DocumentCommandDTO>{
//         if (type == 'details'){
//             return this._pipe.transform(model.question, 'questionTranslations', 'questionAnnexes');
//         }
//         else if (type == 'reply'){
//             let doc = DossiersService.getCurrentProjectDocument(model.currentProject);
//             return (doc ? [doc.command] : [])
//                 .concat(DossiersService.getCurrentProjectAnnexes(model.currentProject).map(d => d.command));
//         }

//         return [];
//     }
// }

// @Pipe({name: 'projectRequestedAgreement'})
// export class ProjectRequestedAgreement implements PipeTransform {
//     transform(p: ReplyProjectDTO): boolean{
//         return p.workflowStep >= CONSTANTS.WorkflowProject.STEP_OMB_EMPOWERED && p.type == ReplyProjectType.FRIENDLY_SOLUTION_REQUEST;
//     }
// }

// @Pipe({name: 'defaultRemark'})
// export class DefaultRemarkPipe implements PipeTransform {
//     transform(p: ReplyProjectDTO): Object{
//         let id: string = p.criticalRemarks ? 'criticalRemarks' :
//             p.furtherRemarks ? 'furtherRemarks' : null;
//         return id ? {id: id} : null;
//     }
// }

// @Pipe({name: 'isCurrentProjectType'})
// export class IsCurrentProjectTypePipe implements PipeTransform {
//     /**
//      * Returns true if the current project is of indicated type
//      *
//      * @param p The current project
//      * @param t The type to check (it has to be one of the keys of {@link ReplyProjectType})
//      */
//     transform(p: ReplyProjectDTO, t: string): boolean {
//         if (!p){
//             return false;
//         }
//         if (Object.keys(ReplyProjectType).indexOf(t) == -1){
//             throw 'You tried to check a type that is not defiend in the ReplyProjectType';
//         }
//         return p.type == ReplyProjectType[t];
//     }
// }

// @Pipe({name: 'eeasCompetenceValue'})
// export class EeasCompetenceValuePipe implements PipeTransform {
//     transform(p: ReplyProjectDTO): boolean {
//         return p.type == ReplyProjectType.NORMAL_REPLY_PROJECT_WITH_WRITTEN_PROCEDURE;
//     }
// }

// @Pipe({name: 'decisionFiles'})
// export class DecisionFilesPipe implements PipeTransform {
//     transform(p: ProcedureLogDTO): Array<VersionDTO> {
//         let m = p.modification;
//         let docs = (m.modifiedReplyDocument ? [m.modifiedReplyDocument] : [])
//                 .concat(m.modifiedReplyAnnexes ? m.modifiedReplyAnnexes : []);

//         let validations = (m.validatedReplyDocument ? [m.validatedReplyDocument] : [])
//             .concat(m.validatedReplyAnnexes ? m.validatedReplyAnnexes : []);

//         return validations.length > 0 && p.type == ProcedureLogType.VALIDATE_MODIFICATIONS_WRITTEN_PROCEDURE
//             ? validations : docs;
//     }
// }

// @Pipe({name: 'hasReplyTabs'})
// export class HasReplyTabsPipe implements PipeTransform {
//     transform(model): boolean {
//         return model.question.replyProjects && model.question.replyProjects.length > 1;
//     }
// }

// @Pipe({name: 'attributionsRefDataUrl'})
// export class AttributionsRefDataUrlPipe implements PipeTransform {
//     transform(model: AttributionsCommandDTO, which: string): string {
//         if (!model.businessType){
//             return null;
//         }
//         return `rest/data/entities/active/${which}/${model.businessType}`;
//     }
// }

// @Pipe({name: 'agreementOk'})
// export class AgreementOkPipe implements PipeTransform {
//     transform(value: AgreementType): boolean {
//         return [AgreementType.AGREEMENT, AgreementType.AGREEMENT_TACIT, AgreementType.OMB_TOTAL_AGREEMENT].indexOf(value) != -1;
//     }
// }

// @Pipe({name: 'assignmentSGLabel'})
// export class AssignmentSGLabelPipe implements PipeTransform {
//     transform(model: AttributionsCommandDTO): string {
//         let s: DossiersService = ServiceInjector.injector.get(DossiersService);
//         if (!model){
//             return '';
//         }
//         return s.isBusinessPq(model.businessType) ? 'task.assignment.sg.label' :
//             s.isBusinessOmb(model.businessType) ? 'replyProject.attributions.SGOMB.label' : '';
//     }
// }
