const matriculaSlot = slots.matricula;
if (!matriculaSlot || !matriculaSlot.value) {
    const speakOutput = 'Por favor, proporciona la matricula del alumno.';
    return handlerInput.responseBuilder
        .addElicitSlotDirective('matricula')
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}