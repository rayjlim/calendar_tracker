<?php

namespace Database\Factories;

use App\Models\Record;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Record::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'goal' => 'weight',
            'date' => $this->faker->date(),
            'count' => $this->faker->randomFloat(1, 60, 80),
            'comment' => $this->faker->sentence(),
            'points' => $this->faker->randomNumber(2)
        ];
    }
}