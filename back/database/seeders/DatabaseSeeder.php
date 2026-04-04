<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'הראל ביטוח',
            'email' => 'harel@bituach.com',
            'password' => Hash::make('123456'),
        ]);

        User::factory(5)->create(); 
        
        $users = User::all();
        Ticket::factory(30)->recycle($users)->create();

        Ticket::factory(3)->recycle($users)->highPriority()->create();
    }
}
