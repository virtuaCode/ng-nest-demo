import { Test } from '@nestjs/testing';
import { TestingModule } from "@nestjs/testing/testing-module";
import { expect } from 'chai';
import { UserController } from "./user.controller";


describe('UserController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        UserController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: UserController;
  beforeEach(() => {
    controller = module.get(UserController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
