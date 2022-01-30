import cloudinary from 'cloudinary'

import { fileUpload } from "../../helpers/fileUpload";



cloudinary.config({ 
    cloud_name: 'dpcumy64t', 
    api_key: '136416492924922', 
    api_secret: 'ORZ4ILdKYydBbMaKVpApLKGI2D8',
    secure: true
  });

describe('Test on fileUpload', () => {
    test('should load a file and return the URL', async() => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.png' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );

        //Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length-1 ].replace('.png', '');

        await cloudinary.v2.api.delete_resources(imageId);
    })

    test('should return a error', async() => {
        
        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    })
    
    
});
