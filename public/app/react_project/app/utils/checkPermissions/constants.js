export const PERMISSIONS_MAP = {
    chat: {
        create: 'v1.newsChat-create',
        getList: 'v1.newsChat-index',
    },
    constructor: {
        edit: 'v1.homepage-update',
        getCategories: 'v1.homepage-getNewsCategories',
        getList: 'v1.homepage-index',
    },
    file: {
        delete: 'v1.file-delete',
        upload: 'v1.file-upload',
    },
    history: {
        getList: 'v1.log-getAll',
        getOne: 'v1.log-getCurrentUse',
    },
    live: {
        getList: 'v1.airLive-index',
        toLive: 'v1.airLive-onAir',
    },
    news: {
        create: 'v1.newslisteditor-create',
        delegate: 'v1.newslisteditor-delegate',
        delete: 'v1.newslisteditor-delete',
        edit: 'v1.newslisteditor-edit',
        getList: 'v1.newslisteditor-get',
        getOne: 'v1.newslisteditor-getOne',
        getRubric: 'v1.newslisteditor-show',
        moderate: 'v1.newslisteditor-getModerated',
        reject: 'v1.newslisteditor-rejection',
        toWork: 'v1.newslisteditor-in_work',
    },
    profile: {
        edit: 'v1.user-editProfile',
        getOne: 'v1.user-profile',
    },
    programs: {
        create: 'v1.tvProgram-create',
        delete: 'v1.tvProgram-destroy',
        edit: 'v1.tvProgram-update',
        getList: 'v1.tvProgram-index',
        getOne: 'v1.tvProgram-show',
    },
    records: {
        create: 'v1.airRecord-create',
        delete: 'v1.airRecord-destroy',
        edit: 'v1.airRecord-update',
        getList: 'v1.airRecord-index',
        getOne: 'v1.airRecord-show',
        publish: 'v1.airRecord-publish',
        upload: 'v1.airRecord-upload',
    },
    rubrics: {
        create: 'v1.rubrics-create',
        delete: 'v1.rubrics-destroy',
        edit: 'v1.rubrics-update',
        getList: 'v1.rubrics-index',
        getOne: 'v1.rubrics-show',
    },
    stats: {
        getList: 'v1.statistics-CountersAll',
        getOne: 'v1.statistics-get',
    },
    tags: {
        create: 'v1.tags-create',
        delete: 'v1.tags-destroy',
        getList: 'v1.tags-index',
        getOne: 'v1.tags-show',
    },
    user: {
        edit: 'v1.user-edit',
        getList: 'v1.user-index',
        getOne: 'v1.user-show',
    },
};
