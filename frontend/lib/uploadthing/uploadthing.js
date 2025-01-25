import { createUploadthing } from 'uploadthing/server';

const f = createUploadthing();

// Define an unauthenticated route for logo uploads
export const ourFileRouter = {
	collegeLogoUploader: f({
		image: { maxFileSize: '4MB', maxFileCount: 1 },
	}).onUploadComplete(({ file }) => {
		console.log('File uploaded successfully:', file);
	}),
};

// Export the router
export const fileRouterConfig = {
	collegeLogoUploader: ourFileRouter.collegeLogoUploader,
};
