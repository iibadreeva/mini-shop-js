var View = {
    render(templateName, model) {
        templateName = templateName + 'Template';

        const templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    }
};

