import 'reflect-metadata'
import { cid, container, mockTransient } from 'inversify-props'
import { AxiosCreator, HttpService, IAxiosCreator, IHttpService } from '@@/src/app/shared/http'
import { ITaskRepository } from '@@/src/app/modules/task/domain'
import { TaskService } from '@@/src/app/modules/task/infrastructure'
import { GetMany, IUseCase } from '@@/src/app/modules/task/usecase/GetMany'
import { IStorage, IStoreCreator, StoreCreator, Storage } from '@@/src/app/shared/storage/Storage'
import { MockAxiosCreator, TestActions } from '@@/src/app/shared/http/HttpService.mock'


export function containerBuilder() {
    container.addTransient<IAxiosCreator>(AxiosCreator)
    container.addTransient<IHttpService>(HttpService)
    container.addTransient<ITaskRepository>(TaskService)
    container.addTransient<IUseCase>(GetMany)
    container.addSingleton<IStoreCreator>(StoreCreator)
    container.addSingleton<IStorage>(Storage)
}

containerBuilder()

console.log('INVERSIFY')
