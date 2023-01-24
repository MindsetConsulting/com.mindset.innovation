using { resume_screening as db } from '../db/data-model';

service CatalogService@(path:'/CatalogService')
    {

    entity ResumeData as projection on db.ResumeData
    }