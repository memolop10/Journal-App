import { types } from "../../types/types";

describe('Test with our types', () => {
    test('should have these types', () => {
        
        expect(types).toEqual({

            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError:'[UI] Remove Error',
        
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        });
    })
    
});
