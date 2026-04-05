import { currentUser } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(async (req) => {
      // get user info from the clerk session
      const user = await currentUser();

      if (!user) {
        throw new UploadThingError(
          'Unauthorized, You must be logged in to upload files.'
        );
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('File Url: ', file.ufsUrl);

      return {
        userId: metadata.userId,
        file,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
