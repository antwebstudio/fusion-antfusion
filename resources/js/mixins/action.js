import actionResponse from "../mixins/action-response"
import errorHandler from "../mixins/error-handler"

export default {
    mixins: [actionResponse, errorHandler],
    props: {
        path: { // Path to get the action object at backend

        },
        url: {
            default: null,
        },
    },
    methods: {
        submit() {
            return this.performAction();
        },
        performAction(params, form) {
            if (!this.url) {
                toast('Error: URL of action is missing. ', 'error');
                return;
            }
            params = {
                ...params,
                route: this.route,
                path: this.path,
                resourceIds: this.record && this.record.id ? [this.record.id] : null,
            }

            if (form) {
                return form.post(this.url, params).then((response) => {
                    this.processActionResponse(response)
                    return response;
                }).catch((error) => {
                    this.catchError(error)
                    return error;
                });
            } else {
                return axios.post(this.url, params).then((response) => {
                    this.processActionResponse(response.data);
                    return response;
                }).catch((error) => {
                    this.catchError(error)
                    return error;
                });
            }
        }
    }
}