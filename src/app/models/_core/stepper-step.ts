/**
 * ID: bh-stepper-step
 * Name: BH Stepper Step
 * Description: Stepper Step object that is used to define the workflow steps and their current state
 * Version: 1
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 */
export interface StepperStep {
    ionIcon: string;
    name: string;
    progress: number;
    isCurrentStep: boolean;
}
