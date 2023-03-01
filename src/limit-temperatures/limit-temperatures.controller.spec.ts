import { Test, TestingModule } from "@nestjs/testing";
import { LimitTemperaturesController } from "./limit-temperatures.controller";
import { LimitTemperaturesService } from "./limit-temperatures.service";

describe("LimitTemperaturesController", () => {
	let controller: LimitTemperaturesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LimitTemperaturesController],
			providers: [LimitTemperaturesService],
		}).compile();

		controller = module.get<LimitTemperaturesController>(
			LimitTemperaturesController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
