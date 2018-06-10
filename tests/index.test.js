const { expect } = require('chai');
const { mount } = require('enzyme');
const { StorybookConsole, LOG, ERROR, WARN, INFO } = require('./../src/index');
const sinon = require('sinon');
const React = require('react');

const emptyDiv = <div></div>;

describe('StorybookConsole tests', () => {

    it('saves original console log function', sinon.test(function() {
        this.spy(StorybookConsole.prototype, 'saveOriginalConsoleFunctions');
        const originalLog = this.spy(window.console, LOG);
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        expect(wrapper.node.originalConsoleFunctions).to.have.all.key([LOG, ERROR, WARN, INFO]);
        expect(wrapper.node.originalConsoleFunctions[LOG]).to.eql(originalLog);
    }));

    it('saves original console error function', sinon.test(function() {
        this.spy(StorybookConsole.prototype, 'saveOriginalConsoleFunctions');
        const originalLog = this.spy(window.console, ERROR);
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        expect(wrapper.node.originalConsoleFunctions).to.have.all.key([LOG, ERROR, WARN, INFO]);
        expect(wrapper.node.originalConsoleFunctions[ERROR]).to.eql(originalLog);
    }));

    it('saves original console warn function', sinon.test(function() {
        this.spy(StorybookConsole.prototype, 'saveOriginalConsoleFunctions');
        const originalLog = this.spy(window.console, WARN);
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        expect(wrapper.node.originalConsoleFunctions).to.have.all.key([LOG, ERROR, WARN, INFO]);
        expect(wrapper.node.originalConsoleFunctions[WARN]).to.eql(originalLog);
    }));

    it('saves original console info function', sinon.test(function() {
        this.spy(StorybookConsole.prototype, 'saveOriginalConsoleFunctions');
        const originalLog = this.spy(window.console, INFO);
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        expect(wrapper.node.originalConsoleFunctions).to.have.all.key([LOG, ERROR, WARN, INFO]);
        expect(wrapper.node.originalConsoleFunctions[INFO]).to.eql(originalLog);
    }));

    it('restores original console log function after unmount', sinon.test(function(){
        const originalLog = this.spy(window.console, LOG);
        const restoreConsoleSpy = this.spy(StorybookConsole.prototype, 'restoreConsole');
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        wrapper.unmount();
        expect(restoreConsoleSpy.calledOnce).to.equal(true);
        expect(window.console.log).to.eql(originalLog);
    }));

    it('restores original console error function after unmount', sinon.test(function(){
        const originalLog = this.spy(window.console, ERROR);
        const restoreConsoleSpy = this.spy(StorybookConsole.prototype, 'restoreConsole');
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        wrapper.unmount();
        expect(restoreConsoleSpy.calledOnce).to.equal(true);
        expect(window.console.error).to.eql(originalLog);
    }));

    it('restores original console warn function after unmount', sinon.test(function(){
        const originalLog = this.spy(window.console, WARN);
        const restoreConsoleSpy = this.spy(StorybookConsole.prototype, 'restoreConsole');
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        wrapper.unmount();
        expect(restoreConsoleSpy.calledOnce).to.equal(true);
        expect(window.console.warn).to.eql(originalLog);
    }));

    it('restores original console info function after unmount', sinon.test(function(){
        const originalLog = this.spy(window.console, INFO);
        const restoreConsoleSpy = this.spy(StorybookConsole.prototype, 'restoreConsole');
        const wrapper = mount(<StorybookConsole children={emptyDiv}/>);
        wrapper.unmount();
        expect(restoreConsoleSpy.calledOnce).to.equal(true);
        expect(window.console.info).to.eql(originalLog);
    }));

});
