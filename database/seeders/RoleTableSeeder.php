<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use Carbon\Carbon;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        Role::insert([
            'name'=> 'Admin',
            'created_at' => Carbon::now(),
        ]);

        Role::insert([
            'name'=> 'User',
            'created_at' => Carbon::now(),
        ]);
    }
}
