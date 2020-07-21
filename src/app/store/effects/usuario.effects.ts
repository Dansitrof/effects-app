import { Injectable } from '@angular/core';

// NGRX
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}


    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuarioService.getUserById( action.id )
                .pipe(
                    map( user => usuariosActions.cargarUsuarioSuccess( {usuario: user} ) ),
                    catchError( error => of (usuariosActions.cargarUsuarioError( {payload: error } )) )
                )
             )
        )
    );

}
