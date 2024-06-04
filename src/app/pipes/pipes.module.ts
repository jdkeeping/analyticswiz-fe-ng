import { FormatStatePipe } from './format-state.pipe';
import { FormatSsnPipe } from './format-ssn.pipe';
import { FormatPhonePipe } from './format-phone.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { SafePipe } from './safe.pipe';
import { NgModule } from '@angular/core';
import { FormatTimestampPipe } from './format-timestamp.pipe';
import { CapitalizePipe } from './capitalize';
import { FormatNumberPipe } from './format-number.pipe';
import { FormatRolePipe } from './format-role.pipe';

/**
 * ID: bh-pipes-module
 * Name: BH Pipes Module
 * Type: Module
 * Description: Modules that contains all project pipes for formatting data in the HTML template.
 * Implementation:
 *    1.) Import pipes.module.ts (PipesModule) into page or component's module.ts
 *    2.) In HTML template, display desired variable with pipe reference. All pipes are included in this module.
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-13 - MW - v1: Initial dev
 */
@NgModule({
    declarations: [
        SafePipe,
        FormatDatePipe,
        FormatTimestampPipe,
        FormatPhonePipe,
        FormatSsnPipe,
        FormatStatePipe,
        CapitalizePipe,
        FormatNumberPipe,
        FormatRolePipe
    ],
    imports: [],
    exports: [
        SafePipe,
        FormatDatePipe,
        FormatTimestampPipe,
        FormatPhonePipe,
        FormatSsnPipe,
        FormatStatePipe,
        CapitalizePipe,
        FormatNumberPipe,
        FormatRolePipe
    ]
})
export class PipesModule { }

