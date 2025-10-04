import { head } from "lodash";

export default {
    props: {
        blob: {
            default: false,
        }
    },
    methods: {
        processActionError(error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast(error.response.data.message, 'error')
            }
        },
        processBlobResponse(response) {
            console.log('blob response', response, (response.data instanceof Blob), filename);
            if (response.data instanceof Blob) {
                var contentDisposition = response.headers['content-disposition'];
                var headerFilename, filename;
                if (contentDisposition) {
                    headerFilename = contentDisposition.split(';')[1].split('=')[1];
                }
                if (headerFilename) {
                    filename = decodeURIComponent(headerFilename);
                }
                var url = window.URL || window.webkitURL;
                const contentType = response.headers['content-type'];
                const blob = new Blob([response.data], { type: contentType });
                var blobUrl = url.createObjectURL(blob);

                this.downloadBlob(blobUrl, filename);
                // window.open(blobUrl);
            }
        },
        downloadBlob(blobUrl, filename) {
            const link = document.createElement('a');
            link.href = blobUrl;
            if (filename) {
                link.setAttribute('download', filename);
            }
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        processActionResponse(response) {
            if (response.data instanceof Blob) {
                this.processBlobResponse(response);
            }
            if (response.message) {
                toast(response.message, 'success')
            }
            if (response.redirect) {
                if (response.target) {
                    window.open(response.redirect, response.target)
                } else {
                    // location.href = response.redirect
                    this.$router.push(response.redirect)
                }
            }
        },
    }
}